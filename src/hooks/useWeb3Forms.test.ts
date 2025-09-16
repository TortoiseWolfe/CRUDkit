import { renderHook, act, waitFor } from '@testing-library/react';
import { useWeb3Forms } from './useWeb3Forms';
import * as web3formsUtils from '@/utils/web3forms';
import type { ContactFormData } from '@/schemas/contact.schema';

// Mock the utilities
vi.mock('@/utils/web3forms', () => ({
  submitWithRetry: vi.fn(),
  checkRateLimit: vi.fn(),
  recordSubmission: vi.fn(),
  formatErrorMessage: vi.fn(),
}));

describe('useWeb3Forms Hook', () => {
  const mockOnSuccess = vi.fn();
  const mockOnError = vi.fn();

  const validFormData: ContactFormData = {
    name: 'John Doe',
    email: 'john@example.com',
    subject: 'Test Subject',
    message: 'This is a test message',
  };

  beforeEach(() => {
    vi.clearAllMocks();
    // Default to allowing submissions
    vi.mocked(web3formsUtils.checkRateLimit).mockReturnValue(true);
    vi.mocked(web3formsUtils.formatErrorMessage).mockImplementation(
      (error) => error.message
    );
  });

  describe('Initial State', () => {
    it('should have correct initial state', () => {
      const { result } = renderHook(() => useWeb3Forms());

      expect(result.current.isSubmitting).toBe(false);
      expect(result.current.isSuccess).toBe(false);
      expect(result.current.isError).toBe(false);
      expect(result.current.error).toBeNull();
      expect(result.current.successMessage).toBeNull();
    });

    it('should accept custom callbacks', () => {
      const { result } = renderHook(() =>
        useWeb3Forms({
          onSuccess: mockOnSuccess,
          onError: mockOnError,
        })
      );

      expect(result.current.submitForm).toBeDefined();
      expect(typeof result.current.submitForm).toBe('function');
    });
  });

  describe('Form Submission', () => {
    it('should handle successful submission', async () => {
      const mockResponse = {
        success: true,
        message: 'Email sent successfully',
      };

      vi.mocked(web3formsUtils.submitWithRetry).mockResolvedValue(mockResponse);

      const { result } = renderHook(() =>
        useWeb3Forms({
          onSuccess: mockOnSuccess,
        })
      );

      await act(async () => {
        await result.current.submitForm(validFormData);
      });

      expect(result.current.isSubmitting).toBe(false);
      expect(result.current.isSuccess).toBe(true);
      expect(result.current.isError).toBe(false);
      expect(result.current.successMessage).toBe('Email sent successfully');
      expect(mockOnSuccess).toHaveBeenCalledWith(mockResponse);
      expect(web3formsUtils.recordSubmission).toHaveBeenCalled();
    });

    it('should handle submission errors', async () => {
      const error = new Error('Network error');
      vi.mocked(web3formsUtils.submitWithRetry).mockRejectedValue(error);
      vi.mocked(web3formsUtils.formatErrorMessage).mockReturnValue(
        'Network error. Please try again.'
      );

      const { result } = renderHook(() =>
        useWeb3Forms({
          onError: mockOnError,
        })
      );

      await act(async () => {
        await result.current.submitForm(validFormData);
      });

      expect(result.current.isSubmitting).toBe(false);
      expect(result.current.isSuccess).toBe(false);
      expect(result.current.isError).toBe(true);
      expect(result.current.error).toBe('Network error. Please try again.');
      expect(mockOnError).toHaveBeenCalledWith(error);
    });

    it('should show submitting state during submission', async () => {
      let resolveSubmit: (value: Web3FormsResponse) => void;
      const submissionPromise = new Promise((resolve) => {
        resolveSubmit = resolve;
      });

      vi.mocked(web3formsUtils.submitWithRetry).mockReturnValue(
        submissionPromise as Promise<Web3FormsResponse>
      );

      const { result } = renderHook(() => useWeb3Forms());

      act(() => {
        result.current.submitForm(validFormData);
      });

      // Check submitting state
      expect(result.current.isSubmitting).toBe(true);
      expect(result.current.isSuccess).toBe(false);
      expect(result.current.isError).toBe(false);

      // Resolve the promise
      await act(async () => {
        resolveSubmit!({ success: true, message: 'Sent' });
        await waitFor(() => !result.current.isSubmitting);
      });

      expect(result.current.isSubmitting).toBe(false);
      expect(result.current.isSuccess).toBe(true);
    });
  });

  describe('Rate Limiting', () => {
    it('should prevent submission when rate limited', async () => {
      vi.mocked(web3formsUtils.checkRateLimit).mockReturnValue(false);

      const { result } = renderHook(() =>
        useWeb3Forms({
          onError: mockOnError,
        })
      );

      await act(async () => {
        await result.current.submitForm(validFormData);
      });

      expect(web3formsUtils.submitWithRetry).not.toHaveBeenCalled();
      expect(result.current.isError).toBe(true);
      expect(result.current.error).toContain('too many submissions');
      expect(mockOnError).toHaveBeenCalled();
    });

    it('should record successful submissions for rate limiting', async () => {
      vi.mocked(web3formsUtils.submitWithRetry).mockResolvedValue({
        success: true,
        message: 'Sent',
      });

      const { result } = renderHook(() => useWeb3Forms());

      await act(async () => {
        await result.current.submitForm(validFormData);
      });

      expect(web3formsUtils.recordSubmission).toHaveBeenCalled();
    });
  });

  describe('State Reset', () => {
    it('should provide reset function', async () => {
      vi.mocked(web3formsUtils.submitWithRetry).mockResolvedValue({
        success: true,
        message: 'Sent',
      });

      const { result } = renderHook(() => useWeb3Forms());

      // Submit form to change state
      await act(async () => {
        await result.current.submitForm(validFormData);
      });

      expect(result.current.isSuccess).toBe(true);

      // Reset state
      act(() => {
        result.current.reset();
      });

      expect(result.current.isSuccess).toBe(false);
      expect(result.current.isError).toBe(false);
      expect(result.current.error).toBeNull();
      expect(result.current.successMessage).toBeNull();
    });
  });

  describe('Custom Messages', () => {
    it('should use custom success message if provided', async () => {
      vi.mocked(web3formsUtils.submitWithRetry).mockResolvedValue({
        success: true,
        message: 'API message',
      });

      const { result } = renderHook(() =>
        useWeb3Forms({
          successMessage: 'Custom success!',
        })
      );

      await act(async () => {
        await result.current.submitForm(validFormData);
      });

      expect(result.current.successMessage).toBe('Custom success!');
    });

    it('should use custom error message if provided', async () => {
      vi.mocked(web3formsUtils.submitWithRetry).mockRejectedValue(
        new Error('API error')
      );

      const { result } = renderHook(() =>
        useWeb3Forms({
          errorMessage: 'Custom error!',
        })
      );

      await act(async () => {
        await result.current.submitForm(validFormData);
      });

      expect(result.current.error).toBe('Custom error!');
    });
  });

  describe('Validation Integration', () => {
    it('should validate form data before submission', async () => {
      const invalidData = {
        name: 'J', // Too short
        email: 'invalid',
        subject: 'Test',
        message: 'Short',
      } as ContactFormData;

      const { result } = renderHook(() => useWeb3Forms());

      await act(async () => {
        const isValid = await result.current.validateBeforeSubmit(invalidData);
        expect(isValid).toBe(false);
      });

      expect(web3formsUtils.submitWithRetry).not.toHaveBeenCalled();
    });

    it('should submit valid data after validation', async () => {
      vi.mocked(web3formsUtils.submitWithRetry).mockResolvedValue({
        success: true,
        message: 'Sent',
      });

      const { result } = renderHook(() => useWeb3Forms());

      await act(async () => {
        const isValid =
          await result.current.validateBeforeSubmit(validFormData);
        expect(isValid).toBe(true);
      });

      // Can proceed with submission after validation
      await act(async () => {
        await result.current.submitForm(validFormData);
      });

      expect(web3formsUtils.submitWithRetry).toHaveBeenCalled();
    });
  });

  describe('Auto Timeout', () => {
    it('should auto-reset success state after timeout', async () => {
      vi.useFakeTimers();

      vi.mocked(web3formsUtils.submitWithRetry).mockResolvedValue({
        success: true,
        message: 'Sent',
      });

      const { result } = renderHook(() =>
        useWeb3Forms({
          autoResetDelay: 3000,
        })
      );

      await act(async () => {
        await result.current.submitForm(validFormData);
      });

      expect(result.current.isSuccess).toBe(true);

      // Advance timers
      act(() => {
        vi.advanceTimersByTime(3000);
      });

      expect(result.current.isSuccess).toBe(false);

      vi.useRealTimers();
    });

    it('should not auto-reset if disabled', async () => {
      vi.useFakeTimers();

      vi.mocked(web3formsUtils.submitWithRetry).mockResolvedValue({
        success: true,
        message: 'Sent',
      });

      const { result } = renderHook(() =>
        useWeb3Forms({
          autoResetDelay: 0, // Disabled
        })
      );

      await act(async () => {
        await result.current.submitForm(validFormData);
      });

      expect(result.current.isSuccess).toBe(true);

      // Advance timers
      act(() => {
        vi.advanceTimersByTime(10000);
      });

      // Should still be success
      expect(result.current.isSuccess).toBe(true);

      vi.useRealTimers();
    });
  });

  describe('Cleanup', () => {
    it('should clean up timeouts on unmount', async () => {
      vi.useFakeTimers();
      const clearTimeoutSpy = vi.spyOn(global, 'clearTimeout');

      vi.mocked(web3formsUtils.submitWithRetry).mockResolvedValue({
        success: true,
        message: 'Sent',
      });

      const { result, unmount } = renderHook(() =>
        useWeb3Forms({
          autoResetDelay: 3000,
        })
      );

      await act(async () => {
        await result.current.submitForm(validFormData);
      });

      unmount();

      expect(clearTimeoutSpy).toHaveBeenCalled();

      vi.useRealTimers();
    });
  });
});
