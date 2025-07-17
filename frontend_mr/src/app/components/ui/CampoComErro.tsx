import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface CampoComErroProps {
  children: React.ReactNode;
  error?: string;
}

export const CampoComErro: React.FC<CampoComErroProps> = ({ children, error }) => {
  const errorVariants = {
    hidden: { 
      opacity: 0, 
      y: -10, 
      scale: 0.95,
      height: 0
    },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      height: 'auto',
      transition: { 
        type: "spring" as const, 
        stiffness: 500, 
        damping: 30,
        height: { duration: 0.2 }
      }
    },
    exit: {
      opacity: 0,
      y: -5,
      scale: 0.95,
      height: 0,
      transition: {
        duration: 0.2
      }
    }
  } as const;

  return (
    <div className="mb-4">
      {children}
      <AnimatePresence mode="wait">
        {error && (
          <motion.div 
            className="flex items-center gap-2 mt-2 text-red-600 text-sm overflow-hidden"
            variants={errorVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.span
              animate={{ 
                rotate: [0, -10, 10, 0],
                scale: [1, 1.2, 1] 
              }}
              transition={{ 
                duration: 0.5,
                repeat: 1
              }}
            >
              ⚠️
            </motion.span>
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              {error}
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};