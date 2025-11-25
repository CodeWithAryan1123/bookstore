import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook for lazy loading images using Intersection Observer
 * @param {string} src - The image source URL
 * @param {object} options - Intersection Observer options
 * @returns {object} - { imageSrc, imageRef }
 */
export const useLazyLoad = (src, options = {}) => {
  const [imageSrc, setImageSrc] = useState(null);
  const imageRef = useRef(null);

  useEffect(() => {
    // Check if Intersection Observer is supported
    if (!('IntersectionObserver' in window)) {
      // Fallback: load image immediately
      setImageSrc(src);
      return;
    }

    const defaultOptions = {
      root: null, // viewport
      rootMargin: '50px', // start loading 50px before image enters viewport
      threshold: 0.01,
      ...options
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !imageSrc) {
          setImageSrc(src);
          // Once loaded, stop observing
          if (imageRef.current) {
            observer.unobserve(imageRef.current);
          }
        }
      });
    }, defaultOptions);

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    };
  }, [src, imageSrc, options]);

  return { imageSrc, imageRef };
};
