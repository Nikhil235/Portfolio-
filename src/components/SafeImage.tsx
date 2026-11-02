import { useState, type ImgHTMLAttributes } from 'react';

type SafeImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  /** Accent used to tint the fallback panel when the image fails to load. */
  accent?: string;
};

/**
 * Responsive <img> component with explicit intrinsic dimensions (width/height),
 * responsive sizes hint, async decoding, and fallback panel to prevent CLS.
 */
export default function SafeImage({
  accent = '#00F0FF',
  className = '',
  alt = '',
  width = 1200,
  height = 675,
  sizes = '(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 640px',
  onError,
  ...rest
}: SafeImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role={alt ? 'img' : undefined}
        aria-label={alt || undefined}
        aria-hidden={alt ? undefined : true}
        className={`w-full ${className} bg-noise`}
        style={{
          backgroundColor: '#0e0e11',
          backgroundImage: `radial-gradient(120% 90% at 20% 0%, ${accent}33 0%, transparent 60%), radial-gradient(rgba(255,255,255,0.05) 1px, transparent 0)`,
          backgroundSize: 'auto, 24px 24px',
        }}
      />
    );
  }

  return (
    <img
      {...rest}
      width={width}
      height={height}
      sizes={sizes}
      alt={alt}
      className={`max-w-full ${className}`}
      decoding="async"
      onError={(e) => {
        setFailed(true);
        onError?.(e);
      }}
    />
  );
}
