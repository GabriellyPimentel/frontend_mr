'use client';

import React, { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';

interface MaeRaizAnimationProps {
  onComplete: () => void;
}

const draw: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (i: number) => {
    const delay = i * 0.3;
    return {
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay, type: "spring", duration: 1.5, bounce: 0 },
        opacity: { delay, duration: 0.01 },
      },
    };
  },
};

export const MaeRaizAnimation: React.FC<MaeRaizAnimationProps> = ({ onComplete }) => {
  const [showAnimation, setShowAnimation] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Detecta se é mobile para ajustar strokeWidth
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const timer = setTimeout(() => {
      setShowAnimation(false);
      setTimeout(onComplete, 800); // Aguarda a animação de fade out
    }, 6000); // Mostra por 6 segundos

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkMobile);
    };
  }, [onComplete]);

  // strokeWidth responsivo
  const strokeStyle: React.CSSProperties = {
    strokeWidth: isMobile ? 6 : 8,
    strokeLinecap: "round",
    fill: "transparent",
  };

  const decorativeStrokeStyle: React.CSSProperties = {
    strokeWidth: isMobile ? 2 : 3,
    strokeLinecap: "round",
    fill: "transparent",
  };

  // Cores para as letras - Paleta natural
  const colors = {
    m: "#4B6043",      // Verde
    a: "#B17853",      // Caramelo
    e: "#4B6043",      // Verde (da paleta)
    space: "#F9F4ED",  // Creme
    r: "#4B6043",      // Verde
    a2: "#B17853",     // Caramelo
    i: "#4B6043",      // Verde (da paleta)
    z: "#4B6043"       // Verde
  };

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center px-4"
      style={{ backgroundColor: "#F9F4ED", zIndex: 9999 }}
      initial={{ opacity: 1 }}
      animate={{ opacity: showAnimation ? 1 : 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="text-center w-full max-w-4xl">
        <motion.div
          className="rounded-lg p-3 sm:p-6 shadow-2xl mx-auto"
          style={{ backgroundColor: "#A3B18A" }}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <motion.svg
            className="w-full h-auto max-w-full"
            viewBox="0 0 840 300"
            preserveAspectRatio="xMidYMid meet"
            initial="hidden"
            animate="visible"
            style={{
              minWidth: "300px",
              maxWidth: "100%",
              height: "auto"
            }}
          >
            {/* Letra M */}
            <motion.path
              d="M 85 250 L 85 50 L 135 150 L 185 50 L 185 250"
              stroke={colors.m}
              variants={draw}
              custom={1}
              style={strokeStyle}
            />
            
            {/* Letra A */}
            <motion.path
              d="M 215 250 L 215 100 Q 215 50 255 50 Q 295 50 295 100 L 295 250"
              stroke={colors.a}
              variants={draw}
              custom={2}
              style={strokeStyle}
            />
            <motion.line
              x1="215"
              y1="150"
              x2="295"
              y2="150"
              stroke={colors.a}
              variants={draw}
              custom={2.5}
              style={strokeStyle}
            />
            
            {/* Letra E */}
            <motion.path
              d="M 325 250 L 325 50 L 395 50"
              stroke={colors.e}
              variants={draw}
              custom={3}
              style={strokeStyle}
            />
            <motion.line
              x1="325"
              y1="150"
              x2="380"
              y2="150"
              stroke={colors.e}
              variants={draw}
              custom={3.5}
              style={strokeStyle}
            />
            <motion.line
              x1="325"
              y1="250"
              x2="395"
              y2="250"
              stroke={colors.e}
              variants={draw}
              custom={4}
              style={strokeStyle}
            />
            
            {/* Espaço - linha decorativa */}
            <motion.circle
              cx="420"
              cy="150"
              r="5"
              stroke={colors.space}
              variants={draw}
              custom={4.5}
              style={decorativeStrokeStyle}
            />
            
            {/* Letra R */}
            <motion.path
              d="M 445 250 L 445 50 L 485 50 Q 515 50 515 100 Q 515 150 485 150 L 445 150"
              stroke={colors.r}
              variants={draw}
              custom={5}
              style={strokeStyle}
            />
            <motion.line
              x1="485"
              y1="150"
              x2="515"
              y2="250"
              stroke={colors.r}
              variants={draw}
              custom={5.5}
              style={strokeStyle}
            />
            
            {/* Letra A (segunda) */}
            <motion.path
              d="M 545 250 L 545 100 Q 545 50 585 50 Q 625 50 625 100 L 625 250"
              stroke={colors.a2}
              variants={draw}
              custom={6}
              style={strokeStyle}
            />
            <motion.line
              x1="545"
              y1="150"
              x2="625"
              y2="150"
              stroke={colors.a2}
              variants={draw}
              custom={6.5}
              style={strokeStyle}
            />
            
            {/* Letra I */}
            <motion.line
              x1="655"
              y1="50"
              x2="655"
              y2="250"
              stroke={colors.i}
              variants={draw}
              custom={7}
              style={strokeStyle}
            />
            <motion.line
              x1="640"
              y1="50"
              x2="670"
              y2="50"
              stroke={colors.i}
              variants={draw}
              custom={7.2}
              style={strokeStyle}
            />
            <motion.line
              x1="640"
              y1="250"
              x2="670"
              y2="250"
              stroke={colors.i}
              variants={draw}
              custom={7.4}
              style={strokeStyle}
            />
            
            {/* Letra Z */}
            <motion.path
              d="M 690 50 L 755 50 L 690 250 L 755 250"
              stroke={colors.z}
              variants={draw}
              custom={8}
              style={strokeStyle}
            />
            
            {/* Elementos decorativos */}
            <motion.circle
              cx="135"
              cy="30"
              r="8"
              stroke="#B17853"
              variants={draw}
              custom={9}
              style={decorativeStrokeStyle}
            />
            <motion.circle
              cx="705"
              cy="30"
              r="8"
              stroke="#A3B18A"
              variants={draw}
              custom={9.5}
              style={decorativeStrokeStyle}
            />
            <motion.circle
              cx="135"
              cy="280"
              r="8"
              stroke="#4B6043"
              variants={draw}
              custom={10}
              style={decorativeStrokeStyle}
            />
            <motion.circle
              cx="705"
              cy="280"
              r="8"
              stroke="#B17853"
              variants={draw}
              custom={10.5}
              style={decorativeStrokeStyle}
            />
            
            {/* Linha decorativa embaixo */}
            <motion.line
              x1="85"
              y1="280"
              x2="755"
              y2="280"
              stroke="#F9F4ED"
              variants={draw}
              custom={11}
              style={decorativeStrokeStyle}
            />
          </motion.svg>
        </motion.div>
        
        <motion.div
          className="mt-2 sm:mt-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 4, duration: 0.8 }}
        >
          <p className="text-sm sm:text-lg font-semibold" style={{color: "#4B6043"}}>
            Conectando mães e profissionais
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};