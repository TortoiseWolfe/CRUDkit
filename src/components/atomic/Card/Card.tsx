import React from 'react';

export interface CardProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
  image?: {
    src: string;
    alt: string;
  };
  actions?: React.ReactNode;
  compact?: boolean;
  side?: boolean;
  glass?: boolean;
  bordered?: boolean;
  className?: string;
}

export const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  children,
  image,
  actions,
  compact = false,
  side = false,
  glass = false,
  bordered = false,
  className = '',
}) => {
  const baseClasses = 'card bg-base-100 shadow-xl';
  
  const classes = [
    baseClasses,
    compact && 'card-compact',
    side && 'card-side',
    glass && 'glass',
    bordered && 'card-bordered',
    className
  ].filter(Boolean).join(' ');
  
  return (
    <div className={classes}>
      {image && (
        <figure>
          <img src={image.src} alt={image.alt} />
        </figure>
      )}
      <div className="card-body">
        {title && <h2 className="card-title">{title}</h2>}
        {subtitle && <p className="text-sm opacity-70">{subtitle}</p>}
        {children}
        {actions && (
          <div className="card-actions justify-end">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;