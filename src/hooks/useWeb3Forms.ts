'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import {
  submitWithRetry,
  checkRateLimit,
  recordSubmission,
  formatErrorMessage,
} from '@/utils/web3forms';
import {
  contactSchema,
  type ContactFormData,
  type Web3FormsResponse,
} from '@/schemas/contact.schema';
import { useOfflineQueue } from './useOfflineQueue';

/**
 * Hook configuration options
 */
export interface UseWeb3FormsOptions {
  onSuccess?: (response: Web3FormsResponse) => void;
  onError?: (error: Error) => void;
  successMessage?: string;
  errorMessage?: string;
  autoResetDelay?: number; // milliseconds, 0 to disable
}

/**
 * Hook return type
 */
export interface UseWeb3FormsReturn {
  submitForm: (data: ContactFormData) => Promise<void>;
  validateBeforeSubmit: (data: ContactFormData) => Promise<boolean>;
  reset: () => void;
  isSubmitting: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: string | null;
  successMessage: string | null;
  isOnline: boolean;
  queueSize: number;
  wasQueuedOffline: boolean;
}

/**
 * Custom hook for handling Web3Forms submissions
 */
export const useWeb3Forms = (
  options: UseWeb3FormsOptions = {}
): UseWeb3FormsReturn => {
  const {
    onSuccess,
    onError,
    successMessage: customSuccessMessage,
    errorMessage: customErrorMessage,
    autoResetDelay = 5000,
  } = options;

  // State management
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [wasQueuedOffline, setWasQueuedOffline] = useState(false);

  // Offline queue management
  const { isOnline, queueSize, addToOfflineQueue } = useOfflineQueue({
    onOnline: () => {
      // Could trigger sync here if needed
      console.log('[Web3Forms] Connection restored');
    },
    onOffline: () => {
      console.log('[Web3Forms] Connection lost - will queue submissions');
    },
  });

  // Ref to track timeout
  const resetTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  /**
   * Reset form state
   */
  const reset = useCallback(() => {
    setIsSubmitting(false);
    setIsSuccess(false);
    setIsError(false);
    setError(null);
    setSuccessMessage(null);
    setWasQueuedOffline(false);

    // Clear any pending timeout
    if (resetTimeoutRef.current) {
      clearTimeout(resetTimeoutRef.current);
      resetTimeoutRef.current = null;
    }
  }, []);

  /**
   * Validate form data before submission
   */
  const validateBeforeSubmit = useCallback(
    async (data: ContactFormData): Promise<boolean> => {
      try {
        const result = contactSchema.safeParse(data);
        if (!result.success) {
          const firstError = result.error.issues[0];
          const errorMessage = firstError?.message || 'Validation failed';
          setError(errorMessage);
          setIsError(true);
          onError?.(new Error(errorMessage));
          return false;
        }
        return true;
      } catch (err) {
        const errorMessage = 'Validation error occurred';
        setError(errorMessage);
        setIsError(true);
        onError?.(err instanceof Error ? err : new Error(errorMessage));
        return false;
      }
    },
    [onError]
  );

  /**
   * Submit form data
   */
  const submitForm = useCallback(
    async (data: ContactFormData): Promise<void> => {
      // Reset previous state
      reset();

      // Check rate limit
      if (!checkRateLimit()) {
        const rateLimitError = new Error('Rate limit exceeded');
        const errorMessage =
          customErrorMessage ||
          'Please wait - too many submissions. Try again in a few minutes.';
        setError(errorMessage);
        setIsError(true);
        onError?.(rateLimitError);
        return;
      }

      // Set submitting state
      setIsSubmitting(true);

      try {
        // Check if offline
        if (!isOnline) {
          console.log('[Web3Forms] Offline - queuing submission');

          // Add to offline queue
          const queued = await addToOfflineQueue(data);

          if (queued) {
            setIsSuccess(true);
            setWasQueuedOffline(true);
            setSuccessMessage(
              'Message queued for sending when online. It will be sent automatically when connection is restored.'
            );

            // Auto-reset after delay
            if (autoResetDelay > 0) {
              resetTimeoutRef.current = setTimeout(reset, autoResetDelay);
            }
          } else {
            throw new Error('Failed to queue message. Please try again.');
          }

          setIsSubmitting(false);
          return;
        }

        // Submit form with retry logic (online)
        const response = await submitWithRetry(data);

        // Record successful submission for rate limiting
        recordSubmission();

        // Update state
        setIsSuccess(true);
        setSuccessMessage(
          customSuccessMessage || response.message || 'Email sent successfully'
        );

        // Call success callback
        onSuccess?.(response);

        // Auto-reset after delay if enabled
        if (autoResetDelay > 0) {
          resetTimeoutRef.current = setTimeout(() => {
            reset();
          }, autoResetDelay);
        }
      } catch (err) {
        // Handle error
        const errorObj =
          err instanceof Error ? err : new Error('Unknown error occurred');
        const formattedError =
          customErrorMessage || formatErrorMessage(errorObj);

        setError(formattedError);
        setIsError(true);

        // Call error callback
        onError?.(errorObj);
      } finally {
        setIsSubmitting(false);
      }
    },
    [
      onSuccess,
      onError,
      customSuccessMessage,
      customErrorMessage,
      autoResetDelay,
      reset,
      isOnline,
      addToOfflineQueue,
    ]
  );

  /**
   * Cleanup on unmount
   */
  useEffect(() => {
    return () => {
      if (resetTimeoutRef.current) {
        clearTimeout(resetTimeoutRef.current);
      }
    };
  }, []);

  return {
    submitForm,
    validateBeforeSubmit,
    reset,
    isSubmitting,
    isSuccess,
    isError,
    error,
    successMessage,
    isOnline,
    queueSize,
    wasQueuedOffline,
  };
};
