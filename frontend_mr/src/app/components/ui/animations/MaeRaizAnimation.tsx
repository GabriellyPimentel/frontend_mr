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

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAnimation(false);
      setTimeout(onComplete, 800); // Aguarda a animação de fade out
    }, 6000); // Mostra por 6 segundos

    return () => clearTimeout(timer);
  }, [onComplete]);

  const strokeStyle: React.CSSProperties = {
    strokeWidth: 8,
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
      className="fixed inset-0 flex items-center justify-center"
      style={{ backgroundColor: "#F9F4ED", zIndex: 9999 }}
      initial={{ opacity: 1 }}
      animate={{ opacity: showAnimation ? 1 : 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="text-center">
        <motion.div
          className="rounded-lg p-6 shadow-2xl"
          style={{ backgroundColor: "#A3B18A" }}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <motion.svg
            width="600"
            height="200"
            viewBox="0 0 800 300"
            initial="hidden"
            animate="visible"
            className="max-w-full"
          >
            {/* Letra M */}
            <motion.path
              d="M 50 250 L 50 50 L 110 150 L 170 50 L 170 250"
              stroke={colors.m}
              variants={draw}
              custom={1}
              style={strokeStyle}
            />
            
            {/* Letra A */}
            <motion.path
              d="M 200 250 L 200 100 Q 200 50 250 50 Q 300 50 300 100 L 300 250"
              stroke={colors.a}
              variants={draw}
              custom={2}
              style={strokeStyle}
            />
            <motion.line
              x1="200"
              y1="150"
              x2="300"
              y2="150"
              stroke={colors.a}
              variants={draw}
              custom={2.5}
              style={strokeStyle}
            />
            
            {/* Letra E */}
            <motion.path
              d="M 330 250 L 330 50 L 420 50"
              stroke={colors.e}
              variants={draw}
              custom={3}
              style={strokeStyle}
            />
            <motion.line
              x1="330"
              y1="150"
              x2="400"
              y2="150"
              stroke={colors.e}
              variants={draw}
              custom={3.5}
              style={strokeStyle}
            />
            <motion.line
              x1="330"
              y1="250"
              x2="420"
              y2="250"
              stroke={colors.e}
              variants={draw}
              custom={4}
              style={strokeStyle}
            />
            
            {/* Espaço - linha decorativa */}
            <motion.circle
              cx="470"
              cy="150"
              r="5"
              stroke={colors.space}
              variants={draw}
              custom={4.5}
              style={{...strokeStyle, strokeWidth: 4}}
            />
            
            {/* Letra R */}
            <motion.path
              d="M 500 250 L 500 50 L 550 50 Q 580 50 580 100 Q 580 150 550 150 L 500 150"
              stroke={colors.r}
              variants={draw}
              custom={5}
              style={strokeStyle}
            />
            <motion.line
              x1="550"
              y1="150"
              x2="580"
              y2="250"
              stroke={colors.r}
              variants={draw}
              custom={5.5}
              style={strokeStyle}
            />
            
            {/* Letra A (segunda) */}
            <motion.path
              d="M 610 250 L 610 100 Q 610 50 660 50 Q 710 50 710 100 L 710 250"
              stroke={colors.a2}
              variants={draw}
              custom={6}
              style={strokeStyle}
            />
            <motion.line
              x1="610"
              y1="150"
              x2="710"
              y2="150"
              stroke={colors.a2}
              variants={draw}
              custom={6.5}
              style={strokeStyle}
            />
            
            {/* Letra I */}
            <motion.line
              x1="740"
              y1="50"
              x2="740"
              y2="250"
              stroke={colors.i}
              variants={draw}
              custom={7}
              style={strokeStyle}
            />
            <motion.line
              x1="720"
              y1="50"
              x2="760"
              y2="50"
              stroke={colors.i}
              variants={draw}
              custom={7.2}
              style={strokeStyle}
            />
            <motion.line
              x1="720"
              y1="250"
              x2="760"
              y2="250"
              stroke={colors.i}
              variants={draw}
              custom={7.4}
              style={strokeStyle}
            />
            
            {/* Letra Z */}
            <motion.path
              d="M 780 50 L 850 50 L 780 250 L 850 250"
              stroke={colors.z}
              variants={draw}
              custom={8}
              style={strokeStyle}
            />
            
            {/* Elementos decorativos */}
            <motion.circle
              cx="100"
              cy="30"
              r="8"
              stroke="#B17853"
              variants={draw}
              custom={9}
              style={{...strokeStyle, strokeWidth: 3}}
            />
            <motion.circle
              cx="650"
              cy="30"
              r="8"
              stroke="#A3B18A"
              variants={draw}
              custom={9.5}
              style={{...strokeStyle, strokeWidth: 3}}
            />
            <motion.circle
              cx="100"
              cy="280"
              r="8"
              stroke="#4B6043"
              variants={draw}
              custom={10}
              style={{...strokeStyle, strokeWidth: 3}}
            />
            <motion.circle
              cx="650"
              cy="280"
              r="8"
              stroke="#B17853"
              variants={draw}
              custom={10.5}
              style={{...strokeStyle, strokeWidth: 3}}
            />
            
            {/* Linha decorativa embaixo */}
            <motion.line
              x1="50"
              y1="280"
              x2="850"
              y2="280"
              stroke="#F9F4ED"
              variants={draw}
              custom={11}
              style={{...strokeStyle, strokeWidth: 3}}
            />
          </motion.svg>
        </motion.div>
        
        <motion.div
          className="mt-4 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 4, duration: 0.8 }}
        >
          <p className="text-lg font-semibold" style={{color: "#4B6043"}}>
            Conectando mães e profissionais
          </p>
        </motion.div>
      </div>
    </motion.div>
  );
};