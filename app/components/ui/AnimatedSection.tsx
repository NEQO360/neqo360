import { motion } from 'framer-motion';
import { ReactNode, memo } from 'react';
import { useIntersectionObserver } from '../../lib/hooks/useIntersectionObserver';

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  direction?: 'up' | 'down' | 'left' | 'right';
  threshold?: number;
  rootMargin?: string;
}

const AnimatedSection = memo(function AnimatedSection({
  children,
  className = '',
  delay = 0,
  duration = 0.6,
  direction = 'up',
  threshold = 0.1,
  rootMargin = '0px'
}: AnimatedSectionProps) {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold,
    rootMargin,
    triggerOnce: true
  });

  const getDirectionalOffset = () => {
    switch (direction) {
      case 'up':
        return { y: 30 };
      case 'down':
        return { y: -30 };
      case 'left':
        return { x: 30 };
      case 'right':
        return { x: -30 };
      default:
        return { y: 30 };
    }
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{
        opacity: 0,
        ...getDirectionalOffset()
      }}
      animate={isIntersecting ? {
        opacity: 1,
        x: 0,
        y: 0
      } : {
        opacity: 0,
        ...getDirectionalOffset()
      }}
      transition={{
        duration: duration * 0.8, // Slightly faster
        delay,
        ease: [0.25, 0.46, 0.45, 0.94], // Custom easing for better performance
      }}
    >
      {children}
    </motion.div>
  );
});

export default AnimatedSection; 