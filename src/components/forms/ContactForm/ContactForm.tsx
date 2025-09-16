'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useWeb3Forms } from '@/hooks/useWeb3Forms';
import { type Web3FormsResponse } from '@/utils/web3forms';
import { contactSchema, type ContactFormData } from '@/schemas/contact.schema';
import { useEffect } from 'react';

export interface ContactFormProps {
  className?: string;
  onSuccess?: (response: Web3FormsResponse) => void;
  onError?: (error: Error) => void;
}

export const ContactForm: React.FC<ContactFormProps> = ({
  className = '',
  onSuccess,
  onError,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: 'onBlur',
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
      _gotcha: '',
    },
  });

  const {
    submitForm,
    isSubmitting,
    isSuccess,
    isError,
    error,
    successMessage,
    reset: resetSubmission,
  } = useWeb3Forms({
    onSuccess,
    onError,
  });

  // Watch honeypot field
  const honeypotValue = watch('_gotcha');

  const onSubmit = async (data: ContactFormData) => {
    // Check honeypot
    if (data._gotcha) {
      return;
    }

    await submitForm(data);
  };

  // Reset form on success
  useEffect(() => {
    if (isSuccess) {
      reset();
    }
  }, [isSuccess, reset]);

  return (
    <div className="mx-auto w-full max-w-2xl">
      <h2 className="mb-6 text-3xl font-bold" role="heading">
        Contact Us
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className={`space-y-4 ${className}`}
        aria-label="Contact form"
        role="form"
        noValidate
      >
        {/* Success Alert */}
        {isSuccess && successMessage && (
          <div role="alert" className="alert alert-success">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{successMessage}</span>
            <button
              type="button"
              className="btn btn-sm"
              onClick={resetSubmission}
              aria-label="Dismiss success message"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Error Alert */}
        {isError && error && (
          <div role="alert" className="alert alert-error">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {/* Name Field */}
        <div className="form-control">
          <label htmlFor="name" className="label">
            <span className="label-text">Full Name</span>
            <span className="label-text-alt text-error">*</span>
          </label>
          <input
            {...register('name')}
            id="name"
            type="text"
            placeholder="John Doe"
            className={`input input-bordered ${errors.name ? 'input-error' : ''}`}
            aria-required="true"
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
            autoComplete="name"
            maxLength={100}
            required
          />
          {errors.name && (
            <label className="label" id="name-error">
              <span
                className="label-text-alt text-error"
                role="alert"
                aria-live="polite"
              >
                {errors.name.message}
              </span>
            </label>
          )}
        </div>

        {/* Email Field */}
        <div className="form-control">
          <label htmlFor="email" className="label">
            <span className="label-text">Email Address</span>
            <span className="label-text-alt text-error">*</span>
          </label>
          <input
            {...register('email')}
            id="email"
            type="email"
            placeholder="john@example.com"
            className={`input input-bordered ${errors.email ? 'input-error' : ''}`}
            aria-required="true"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
            autoComplete="email"
            maxLength={254}
            required
          />
          {errors.email && (
            <label className="label" id="email-error">
              <span
                className="label-text-alt text-error"
                role="alert"
                aria-live="polite"
              >
                {errors.email.message}
              </span>
            </label>
          )}
        </div>

        {/* Subject Field */}
        <div className="form-control">
          <label htmlFor="subject" className="label">
            <span className="label-text">Subject</span>
            <span className="label-text-alt text-error">*</span>
          </label>
          <input
            {...register('subject')}
            id="subject"
            type="text"
            placeholder="How can we help you?"
            className={`input input-bordered ${errors.subject ? 'input-error' : ''}`}
            aria-required="true"
            aria-invalid={!!errors.subject}
            aria-describedby={errors.subject ? 'subject-error' : undefined}
            maxLength={200}
            required
          />
          {errors.subject && (
            <label className="label" id="subject-error">
              <span
                className="label-text-alt text-error"
                role="alert"
                aria-live="polite"
              >
                {errors.subject.message}
              </span>
            </label>
          )}
        </div>

        {/* Message Field */}
        <div className="form-control">
          <label htmlFor="message" className="label">
            <span className="label-text">Message</span>
            <span className="label-text-alt text-error">*</span>
          </label>
          <textarea
            {...register('message')}
            id="message"
            rows={6}
            placeholder="Tell us more about your inquiry..."
            className={`textarea textarea-bordered ${errors.message ? 'textarea-error' : ''}`}
            aria-required="true"
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? 'message-error' : undefined}
            maxLength={5000}
            required
          />
          {errors.message && (
            <label className="label" id="message-error">
              <span
                className="label-text-alt text-error"
                role="alert"
                aria-live="polite"
              >
                {errors.message.message}
              </span>
            </label>
          )}
        </div>

        {/* Honeypot Field (Hidden) */}
        <div style={{ position: 'absolute', left: '-9999px' }}>
          <label htmlFor="_gotcha">
            Don&apos;t fill this out if you&apos;re human:
          </label>
          <input
            {...register('_gotcha')}
            type="text"
            id="_gotcha"
            name="_gotcha"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        {/* Show bot detected error if honeypot is filled */}
        {honeypotValue && (
          <div role="alert" className="alert alert-error">
            <span>Bot detected</span>
          </div>
        )}

        {/* Submit Button */}
        <div className="form-control mt-6">
          <button
            type="submit"
            className={`btn btn-primary ${isSubmitting ? 'loading' : ''}`}
            disabled={isSubmitting || !isValid || !!honeypotValue}
          >
            {isSubmitting ? 'Sending...' : 'Send Message'}
          </button>
        </div>
      </form>
    </div>
  );
};
