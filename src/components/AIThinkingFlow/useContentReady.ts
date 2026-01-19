'use client';

import { useState, useEffect, useCallback, RefObject } from 'react';
import { ContentReadyState } from './types';

interface UseContentReadyOptions {
  minDuration: number;
  maxDuration: number;
  waitForImages: boolean;
  enabled: boolean;
}

export function useContentReady(
  containerRef: RefObject<HTMLElement | null>,
  options: UseContentReadyOptions
): ContentReadyState {
  const { minDuration, maxDuration, waitForImages, enabled } = options;

  const [minDurationElapsed, setMinDurationElapsed] = useState(!enabled);
  const [isMounted, setIsMounted] = useState(!enabled);
  const [imagesLoaded, setImagesLoaded] = useState(!enabled || !waitForImages);

  // Handle minimum duration timer
  useEffect(() => {
    if (!enabled) return;

    const timer = setTimeout(() => {
      setMinDurationElapsed(true);
    }, minDuration);

    return () => clearTimeout(timer);
  }, [minDuration, enabled]);

  // Handle maximum duration timeout (fallback)
  useEffect(() => {
    if (!enabled) return;

    const timer = setTimeout(() => {
      setMinDurationElapsed(true);
      setIsMounted(true);
      setImagesLoaded(true);
    }, maxDuration);

    return () => clearTimeout(timer);
  }, [maxDuration, enabled]);

  // Check for images loaded
  const checkImagesLoaded = useCallback(() => {
    if (!containerRef.current || !waitForImages) {
      setImagesLoaded(true);
      return;
    }

    const images = containerRef.current.querySelectorAll('img');

    if (images.length === 0) {
      setImagesLoaded(true);
      return;
    }

    const allLoaded = Array.from(images).every((img) => img.complete);

    if (allLoaded) {
      setImagesLoaded(true);
      return;
    }

    // Wait for images that haven't loaded yet
    let loadedCount = 0;
    const totalImages = images.length;

    const handleLoad = () => {
      loadedCount++;
      if (loadedCount >= totalImages) {
        setImagesLoaded(true);
      }
    };

    const handleError = () => {
      loadedCount++;
      if (loadedCount >= totalImages) {
        setImagesLoaded(true);
      }
    };

    images.forEach((img) => {
      if (img.complete) {
        loadedCount++;
      } else {
        img.addEventListener('load', handleLoad);
        img.addEventListener('error', handleError);
      }
    });

    if (loadedCount >= totalImages) {
      setImagesLoaded(true);
    }

    return () => {
      images.forEach((img) => {
        img.removeEventListener('load', handleLoad);
        img.removeEventListener('error', handleError);
      });
    };
  }, [containerRef, waitForImages]);

  // Detect when container is mounted and check images
  useEffect(() => {
    if (!enabled) return;

    // Use MutationObserver to detect when children are added
    const observer = new MutationObserver(() => {
      if (containerRef.current && containerRef.current.children.length > 0) {
        setIsMounted(true);
        checkImagesLoaded();
      }
    });

    if (containerRef.current) {
      // Check immediately if already mounted
      if (containerRef.current.children.length > 0) {
        setIsMounted(true);
        checkImagesLoaded();
      }

      observer.observe(containerRef.current, {
        childList: true,
        subtree: true,
      });
    }

    return () => observer.disconnect();
  }, [containerRef, enabled, checkImagesLoaded]);

  const isReady = minDurationElapsed && isMounted && imagesLoaded;

  return {
    minDurationElapsed,
    isMounted,
    imagesLoaded,
    isReady,
  };
}

export default useContentReady;
