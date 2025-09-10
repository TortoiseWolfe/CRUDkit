import React from 'react';

export type TextVariant = 
  | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
  | 'body' | 'lead' | 'small'
  | 'code' | 'emphasis' | 'caption';

export interface TextProps {
  variant?: TextVariant;
  children: React.ReactNode;
  className?: string;
  as?: React.ElementType;
}

const variantStyles: Record<TextVariant, string> = {
  h1: 'text-5xl font-bold text-gray-900 dark:text-white',
  h2: 'text-4xl font-bold text-gray-900 dark:text-white',
  h3: 'text-3xl font-semibold text-gray-900 dark:text-white',
  h4: 'text-2xl font-semibold text-gray-900 dark:text-white',
  h5: 'text-xl font-medium text-gray-900 dark:text-white',
  h6: 'text-lg font-medium text-gray-900 dark:text-white',
  body: 'text-base text-gray-700 dark:text-gray-300',
  lead: 'text-xl text-gray-600 dark:text-gray-400',
  small: 'text-sm text-gray-600 dark:text-gray-400',
  code: 'font-mono text-sm bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded',
  emphasis: 'text-base italic text-gray-700 dark:text-gray-300',
  caption: 'text-xs text-gray-500 dark:text-gray-500',
};

const variantElements: Partial<Record<TextVariant, React.ElementType>> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  h6: 'h6',
  code: 'code',
  emphasis: 'em',
};

export const Text: React.FC<TextProps> = ({
  variant = 'body',
  children,
  className = '',
  as,
}) => {
  const Component = as || variantElements[variant] || 'p';
  const combinedClassName = `${variantStyles[variant]} ${className}`.trim();

  return (
    <Component className={combinedClassName}>
      {children}
    </Component>
  );
};

export default Text;