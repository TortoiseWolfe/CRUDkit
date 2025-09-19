import React from 'react';
import Image from 'next/image';
import { SpinningLogo } from './SpinningLogo';

export interface LayeredScriptHammerLogoProps {
  className?: string;
  size?: number;
  speed?: 'slow' | 'normal' | 'fast' | number;
  pauseOnHover?: boolean;
}

export const LayeredScriptHammerLogo: React.FC<
  LayeredScriptHammerLogoProps
> = ({ className = '', size = 250, speed = 'slow', pauseOnHover = true }) => {
  return (
    <div
      className={`relative ${className}`}
      style={{ width: size, height: size }}
    >
      {/* Rotating gear ring with hammer (hammer will be hidden by static layers) */}
      <SpinningLogo size={size} speed={speed} pauseOnHover={pauseOnHover}>
        <Image
          src="/scripthammer-logo.svg"
          alt="Gear Ring"
          width={400}
          height={400}
          className="h-full w-full"
          style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          priority
        />
      </SpinningLogo>

      {/* Static script tags in center - covers rotating hammer */}
      <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
        <Image
          src="/script-tags.svg"
          alt="Script Tags"
          width={size * 0.4}
          height={size * 0.4}
          style={{ width: `${size * 0.4}px`, height: `${size * 0.4}px` }}
          priority
        />
      </div>

      {/* Static printing mallet layer - nudged up and right */}
      <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center">
        <Image
          src="/printing-mallet.svg"
          alt="Printing Mallet"
          width={size * 0.45}
          height={size * 0.45}
          style={{
            width: `${size * 0.45}px`,
            height: `${size * 0.45}px`,
            opacity: 0.9,
            transform: 'translate(-20px, 20px)',
          }}
          priority
        />
      </div>
    </div>
  );
};

LayeredScriptHammerLogo.displayName = 'LayeredScriptHammerLogo';
