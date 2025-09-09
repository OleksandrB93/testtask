import React, { useState, useRef, useEffect, memo } from "react";
import styles from "./LazyImage.module.scss";

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  placeholder?: string;
  onLoad?: () => void;
  onError?: () => void;
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = "",
  placeholder,
  onLoad,
  onError,
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        threshold: 0.1,
        rootMargin: "50px",
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  return (
    <div ref={imgRef} className={`${styles.lazyImageContainer} ${className}`}>
      {!isInView ? (
        <div className={styles.placeholder}>{placeholder || "Loading..."}</div>
      ) : (
        <>
          {!isLoaded && !hasError && (
            <div className={styles.placeholder}>
              {placeholder || "Loading..."}
            </div>
          )}
          <img
            src={src}
            alt={alt}
            className={`${styles.image} ${isLoaded ? styles.loaded : ""}`}
            onLoad={handleLoad}
            onError={handleError}
            loading="lazy"
          />
        </>
      )}
    </div>
  );
};

export default memo(LazyImage);
