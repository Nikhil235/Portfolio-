import { useState, type ImgHTMLAttributes } from 'react';

type SafeImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  /** Accent used to tint the fallback panel when the image fails to load. */
  accent?: string;
};

/**
 * <img> that never shows the browser's broken-image glyph. If the source 404s
 * (e.g. a remote CDN asset is removed) it swaps to a tinted gradient panel
 * occupying the same box, so the card layout and overlays stay intact.
 */
export default function SafeImage({ accent = '#00F0FF', className = '', alt = '', onError, ...rest }: SafeImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role={alt ? 'img' : undefined}
        aria-label={alt || undefined}
        aria-hidden={alt ? undefined : true}
        className={`${className} bg-noise`}
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
      alt={alt}
      className={className}
      decoding="async"
      onError={(e) => {
        setFailed(true);
        onError?.(e);
      }}
    />
  );
}
