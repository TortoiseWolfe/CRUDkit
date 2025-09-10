import React from 'react';
import NextLink from 'next/link';

export type LinkVariant = 
  | 'default'
  | 'primary' 
  | 'secondary'
  | 'accent'
  | 'ghost'
  | 'underline'
  | 'hover-underline'
  | 'nav';

export interface LinkProps {
  href: string;
  children: React.ReactNode;
  variant?: LinkVariant;
  className?: string;
  external?: boolean;
  target?: string;
  rel?: string;
}

const variantStyles: Record<LinkVariant, string> = {
  default: 'text-base-content hover:text-primary transition-colors',
  primary: 'text-primary hover:text-primary-focus transition-colors',
  secondary: 'text-secondary hover:text-secondary-focus transition-colors', 
  accent: 'text-accent hover:text-accent-focus transition-colors',
  ghost: 'text-base-content/70 hover:text-base-content transition-colors',
  underline: 'text-base-content underline hover:text-primary transition-colors',
  'hover-underline': 'text-base-content hover:underline hover:text-primary transition-colors',
  nav: 'text-base-content hover:text-primary font-medium transition-colors',
};

export const Link: React.FC<LinkProps> = ({
  href,
  children,
  variant = 'default',
  className = '',
  external = false,
  target,
  rel,
}) => {
  const combinedClassName = `${variantStyles[variant]} ${className}`.trim();
  
  // Ensure internal links have trailing slash for our config
  const processedHref = !external && !href.startsWith('http') && !href.endsWith('/') 
    ? `${href}/` 
    : href;

  // External links or anchors use regular <a> tag
  if (external || href.startsWith('http') || href.startsWith('#')) {
    return (
      <a 
        href={href}
        className={combinedClassName}
        target={target || (external ? '_blank' : undefined)}
        rel={rel || (external ? 'noopener noreferrer' : undefined)}
      >
        {children}
      </a>
    );
  }

  // Internal links use Next.js Link
  return (
    <NextLink 
      href={processedHref}
      className={combinedClassName}
      target={target}
      rel={rel}
    >
      {children}
    </NextLink>
  );
};

export default Link;