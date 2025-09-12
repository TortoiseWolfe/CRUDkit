import React from 'react';
import { FormError } from './FormError';

export interface FormFieldProps {
  /** Field label */
  label: string;
  /** Field name for form and ARIA */
  name: string;
  /** Error message to display */
  error?: string;
  /** Whether field is required */
  required?: boolean;
  /** Help text to display below field */
  helpText?: string;
  /** Children (input element) */
  children: React.ReactNode;
  /** Additional CSS classes */
  className?: string;
  /** Hide label visually (still available to screen readers) */
  hideLabel?: boolean;
}

/**
 * Form field wrapper with label, error, and help text
 *
 * Features:
 * - Consistent field layout
 * - Accessible label associations
 * - Error message display
 * - Optional help text
 * - Required field indicators
 *
 * @example
 * ```tsx
 * <FormField
 *   label="Email Address"
 *   name="email"
 *   error={errors.email}
 *   required
 *   helpText="We'll never share your email"
 * >
 *   <input type="email" name="email" />
 * </FormField>
 * ```
 */
export const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  error,
  required = false,
  helpText,
  children,
  className = '',
  hideLabel = false,
}) => {
  const errorId = `${name}-error`;
  const helpId = `${name}-help`;

  return (
    <div className={`form-control ${className}`}>
      <label htmlFor={name} className={`label ${hideLabel ? 'sr-only' : ''}`}>
        <span className="label-text">
          {label}
          {required && (
            <span className="text-error ml-1" aria-label="required">
              *
            </span>
          )}
        </span>
      </label>

      {/* Clone children and add ARIA attributes */}
      {React.isValidElement(children) &&
        React.cloneElement(children as React.ReactElement, {
          id: name,
          'aria-invalid': !!error,
          'aria-describedby':
            [error && errorId, helpText && helpId].filter(Boolean).join(' ') ||
            undefined,
          'aria-required': required,
          className: `${(children as React.ReactElement).props.className || ''} ${
            error ? 'input-error' : ''
          }`,
        })}

      {/* Help text */}
      {helpText && !error && (
        <div id={helpId} className="label-text-alt text-base-content/70 mt-1">
          {helpText}
        </div>
      )}

      {/* Error message */}
      <FormError error={error} id={errorId} />
    </div>
  );
};
