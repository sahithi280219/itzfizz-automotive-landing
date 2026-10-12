import React, { useState } from 'react';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackSrc?: string;
  priority?: boolean;
  containerClassName?: string;
}

export const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  fallbackSrc,
  priority = false,
  className = '',
  containerClassName = '',
  style,
  ...props
}) => {
  const [currentSrc, setCurrentSrc] = useState<string>(src);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [hasFailed, setHasFailed] = useState<boolean>(false);

  const handleError = () => {
    if (fallbackSrc && currentSrc !== fallbackSrc) {
      setCurrentSrc(fallbackSrc);
    } else {
      setHasFailed(true);
    }
  };

  const handleLoad = () => {
    setIsLoaded(true);
  };

  return (
    <div className={`relative overflow-hidden ${containerClassName}`}>
      {/* Sleek Skeleton Shimmer until loaded */}
      {!isLoaded && !hasFailed && (
        <div className="absolute inset-0 bg-neutral-900/80 animate-pulse flex items-center justify-center z-5">
          <div className="w-8 h-8 rounded-full border border-orange-500/30 border-t-orange-500 animate-spin" />
        </div>
      )}

      {/* Fallback View if image network completely breaks */}
      {hasFailed ? (
        <div className="absolute inset-0 bg-[#0d0d10] border border-white/10 flex flex-col items-center justify-center p-6 text-center z-10">
          <div className="text-xs font-mono uppercase tracking-widest text-orange-400 mb-2">
            ITZFIZZ Automotive Visualization
          </div>
          <div className="text-sm font-bold font-display uppercase text-white">
            {alt || 'Vehicle Render'}
          </div>
          <div className="mt-2 text-[10px] font-mono text-neutral-500">
            Modena Technical Specification Asset
          </div>
        </div>
      ) : (
        <img
          src={currentSrc}
          alt={alt}
          loading={priority ? 'eager' : 'lazy'}
          fetchPriority={priority ? 'high' : 'auto'}
          decoding="async"
          onLoad={handleLoad}
          onError={handleError}
          className={`transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'} ${className}`}
          style={style}
          referrerPolicy="no-referrer"
          {...props}
        />
      )}
    </div>
  );
};
