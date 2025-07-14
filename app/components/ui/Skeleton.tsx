import { motion } from 'framer-motion';

interface SkeletonProps {
  className?: string;
  width?: string | number;
  height?: string | number;
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
  animate?: boolean;
}

export function Skeleton({ 
  className = '', 
  width, 
  height, 
  rounded = 'md',
  animate = true 
}: SkeletonProps) {
  const baseClasses = 'bg-muted';
  const roundedClasses = {
    none: '',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
    full: 'rounded-full'
  };

  const skeletonClasses = `${baseClasses} ${roundedClasses[rounded]} ${className}`;
  
  const style = {
    width: width,
    height: height,
  };

  const Component = animate ? motion.div : 'div';

  return (
    <Component
      className={skeletonClasses}
      style={style}
      {...(animate && {
        animate: {
          opacity: [0.5, 1, 0.5],
        },
        transition: {
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        },
      })}
    />
  );
}

// Predefined skeleton components
export function SkeletonText({ 
  lines = 1, 
  className = '',
  lastLineWidth = '60%' 
}: { 
  lines?: number; 
  className?: string;
  lastLineWidth?: string;
}) {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, index) => (
        <Skeleton
          key={index}
          height="1rem"
          width={index === lines - 1 ? lastLineWidth : '100%'}
          className="h-4"
        />
      ))}
    </div>
  );
}

export function SkeletonCard({ className = '' }: { className?: string }) {
  return (
    <div className={`p-6 border border-border rounded-xl ${className}`}>
      <div className="flex items-center space-x-4 mb-4">
        <Skeleton width={48} height={48} rounded="full" />
        <div className="flex-1">
          <Skeleton height="1rem" width="60%" className="mb-2" />
          <Skeleton height="0.875rem" width="40%" />
        </div>
      </div>
      <SkeletonText lines={3} />
    </div>
  );
}

export function SkeletonButton({ className = '' }: { className?: string }) {
  return (
    <Skeleton 
      width={120} 
      height={40} 
      rounded="lg" 
      className={className}
    />
  );
}

export function SkeletonInput({ className = '' }: { className?: string }) {
  return (
    <Skeleton 
      width="100%" 
      height={48} 
      rounded="xl" 
      className={className}
    />
  );
}

export function SkeletonAvatar({ size = 40, className = '' }: { size?: number; className?: string }) {
  return (
    <Skeleton 
      width={size} 
      height={size} 
      rounded="full" 
      className={className}
    />
  );
}

export function SkeletonImage({ 
  width = '100%', 
  height = 200, 
  className = '' 
}: { 
  width?: string | number; 
  height?: string | number; 
  className?: string;
}) {
  return (
    <Skeleton 
      width={width} 
      height={height} 
      rounded="lg" 
      className={className}
    />
  );
}

// Section skeleton for page loading
export function SkeletonSection({ className = '' }: { className?: string }) {
  return (
    <div className={`py-24 ${className}`}>
      <div className="container-width section-padding">
        <div className="text-center space-y-4 mb-16">
          <Skeleton height="3rem" width="60%" className="mx-auto" />
          <Skeleton height="1.5rem" width="80%" className="mx-auto" />
        </div>
        
        <div className="grid lg:grid-cols-2 gap-16">
          <div className="space-y-8">
            <SkeletonText lines={4} />
            <div className="space-y-6">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="flex items-center space-x-4">
                  <Skeleton width={40} height={40} rounded="full" />
                  <Skeleton height="1rem" width="70%" />
                </div>
              ))}
            </div>
            <SkeletonButton />
          </div>
          
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <SkeletonInput />
              <SkeletonInput />
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <SkeletonInput />
              <SkeletonInput />
            </div>
            <Skeleton height={120} rounded="xl" />
            <SkeletonButton />
          </div>
        </div>
      </div>
    </div>
  );
}

// Hero section skeleton
export function SkeletonHero({ className = '' }: { className?: string }) {
  return (
    <div className={`min-h-screen flex items-center justify-center ${className}`}>
      <div className="text-center space-y-8">
        <Skeleton height="4rem" width="80%" className="mx-auto" />
        <Skeleton height="1.5rem" width="60%" className="mx-auto" />
        <div className="flex justify-center space-x-4">
          <SkeletonButton />
          <SkeletonButton />
        </div>
      </div>
    </div>
  );
} 