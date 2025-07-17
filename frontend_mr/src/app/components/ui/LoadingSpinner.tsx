import React from 'react';
import { motion, Variants } from 'framer-motion';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
}

const spinnerVariants: Variants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: "linear"
    }
  }
};

const dotVariants: Variants = {
  animate: {
    scale: [1, 1.2, 1],
    opacity: [0.7, 1, 0.7],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

const textVariants: Variants = {
  animate: {
    opacity: [0.5, 1, 0.5],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'md',
  color = 'white'
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-8 h-8'
  };

  return (
    <div className="flex items-center justify-center">
      <motion.div
        className={`${sizeClasses[size]} border-2 border-t-transparent rounded-full`}
        style={{
          borderColor: color === 'white' ? 'rgba(255, 255, 255, 0.3)' : 'rgba(75, 96, 67, 0.3)',
          borderTopColor: 'transparent'
        }}
        variants={spinnerVariants}
        animate="animate"
      >
        <motion.div
          className={`${sizeClasses[size]} border-2 border-transparent border-t-current rounded-full`}
          style={{
            borderTopColor: color === 'white' ? '#ffffff' : '#4B6043'
          }}
        />
      </motion.div>
    </div>
  );
};

export const PulsingDots: React.FC<{ color?: string }> = ({ color = 'white' }) => {
  return (
    <div className="flex space-x-1">
      {[0, 1, 2].map((index) => (
        <motion.div
          key={index}
          className="w-2 h-2 rounded-full"
          style={{ backgroundColor: color === 'white' ? '#ffffff' : '#4B6043' }}
          variants={dotVariants}
          animate="animate"
          transition={{ delay: index * 0.2 }}
        />
      ))}
    </div>
  );
};

export const LoadingWithText: React.FC<{
  text?: string;
  color?: string;
  size?: 'sm' | 'md' | 'lg';
}> = ({
  text = 'Carregando...',
  color = 'white',
  size = 'md'
}) => {
  return (
    <div className="flex items-center space-x-3">
      <LoadingSpinner size={size} color={color} />
      <motion.span
        className={`${size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-lg' : 'text-base'} font-medium`}
        style={{ color: color === 'white' ? '#ffffff' : '#4B6043' }}
        variants={textVariants}
        animate="animate"
      >
        {text}
      </motion.span>
    </div>
  );
};

export default LoadingSpinner;

