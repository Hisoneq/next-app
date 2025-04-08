import { useEffect, useState, RefObject } from 'react';

interface IntersectionResult {
  isIntersecting: boolean;
}

const useIntersection = (
  ref: RefObject<Element>,
  options?: IntersectionObserverInit
): IntersectionResult => {
  const [isIntersecting, setIsIntersecting] = useState<boolean>(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
      },
      {
        root: options?.root || null,
        rootMargin: options?.rootMargin || '0px',
        threshold: options?.threshold || 0,
      }
    );

    const currentRef = ref.current;

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [ref, options]);

  return { isIntersecting };
};

export default useIntersection;