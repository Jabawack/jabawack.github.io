'use client';

import { useEffect, useRef, ReactNode } from 'react';
import { Box, BoxProps } from '@mui/material';

interface AnimatedSectionProps extends BoxProps {
  children: ReactNode;
  delay?: number;
}

export default function AnimatedSection({ children, delay = 0, ...props }: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('visible');
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, [delay]);

  return (
    <Box ref={ref} className="animate-on-scroll" {...props}>
      {children}
    </Box>
  );
}
