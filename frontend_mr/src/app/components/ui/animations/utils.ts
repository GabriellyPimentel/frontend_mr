import { Variants } from 'framer-motion';

// 🎭 VARIANTES DE ANIMAÇÃO REUTILIZÁVEIS

// Entrada de página
export const pageTransition: Variants = {
  hidden: { 
    opacity: 0, 
    y: 20,
    scale: 0.95
  },
  visible: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
      staggerChildren: 0.1
    }
  },
  exit: { 
    opacity: 0, 
    y: -20,
    scale: 1.05,
    transition: {
      duration: 0.4,
      ease: "easeIn" as const
    }
  }
};

// Container com stagger
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
};

// Itens que entram de baixo para cima
export const slideUpItem: Variants = {
  hidden: { 
    opacity: 0, 
    y: 30 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.5, 
      ease: "easeOut" as const
    }
  }
};

// Fade simples
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.4 }
  }
};

// Escala com bounce
export const scaleIn: Variants = {
  hidden: { 
    scale: 0, 
    opacity: 0 
  },
  visible: { 
    scale: 1, 
    opacity: 1,
    transition: {
      type: "spring" as const,
      stiffness: 200,
      damping: 15,
      duration: 0.6
    }
  }
};

// Slide lateral (esquerda para direita)
export const slideInLeft: Variants = {
  hidden: { 
    x: -50, 
    opacity: 0 
  },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const
    }
  }
};

// Slide lateral (direita para esquerda)
export const slideInRight: Variants = {
  hidden: { 
    x: 50, 
    opacity: 0 
  },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const
    }
  }
};

// Rotação com entrada
export const rotateIn: Variants = {
  hidden: { 
    rotate: -180, 
    scale: 0,
    opacity: 0 
  },
  visible: { 
    rotate: 0, 
    scale: 1,
    opacity: 1,
    transition: {
      duration: 0.8,
      ease: "easeOut" as const,
      type: "spring" as const,
      stiffness: 100
    }
  }
};

// Animação de shake para erros
export const shakeX: Variants = {
  shake: {
    x: [-5, 5, -5, 5, 0],
    transition: {
      duration: 0.5,
      ease: "easeInOut" as const
    }
  }
};

// Hover effects para botões
export const buttonHover = {
  scale: 1.05,
  boxShadow: "0 8px 25px rgba(0, 0, 0, 0.15)",
  transition: {
    duration: 0.2,
    ease: "easeOut"
  }
};

export const buttonTap = {
  scale: 0.95,
  transition: {
    duration: 0.1
  }
};

// Hover effects para cards
export const cardHover = {
  y: -5,
  boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
  transition: {
    duration: 0.3,
    ease: "easeOut"
  }
};

// Animação de pulsação para elementos de atenção
export const pulse: Variants = {
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Animação de flutuação suave
export const float: Variants = {
  animate: {
    y: [-5, 5, -5],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

// Modal backdrop
export const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { duration: 0.3 }
  },
  exit: { 
    opacity: 0,
    transition: { duration: 0.2 }
  }
};

// Modal content
export const modalVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    y: -50
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
      type: "spring",
      stiffness: 200
    }
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: 20,
    transition: {
      duration: 0.3,
      ease: "easeIn"
    }
  }
};

// Transição de tabs
export const tabTransition: Variants = {
  enter: {
    x: 50,
    opacity: 0,
    scale: 0.95
  },
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: "easeOut"
    }
  },
  exit: {
    x: -50,
    opacity: 0,
    scale: 0.95,
    transition: {
      duration: 0.3,
      ease: "easeIn"
    }
  }
};

// Input focus effects
export const inputFocus = {
  scale: 1.02,
  boxShadow: "0 4px 20px rgba(75, 96, 67, 0.15)",
  borderColor: "#4B6043",
  backgroundColor: "#F9F4ED",
  transition: {
    duration: 0.2,
    ease: "easeOut"
  }
};

export const inputBlur = {
  scale: 1,
  boxShadow: "0 0 0 rgba(0, 0, 0, 0)",
  borderColor: "#e5e7eb",
  backgroundColor: "#ffffff",
  transition: {
    duration: 0.2,
    ease: "easeOut"
  }
};

// 🎨 CONFIGURAÇÕES DE TRANSIÇÃO PRÉ-DEFINIDAS

export const springTransition = {
  type: "spring" as const,
  stiffness: 200,
  damping: 20
};

export const easeTransition = {
  duration: 0.3,
  ease: "easeOut" as const
};

export const quickTransition = {
  duration: 0.2,
  ease: "easeInOut" as const
};

export const slowTransition = {
  duration: 0.8,
  ease: "easeOut" as const
};

// 🎯 UTILITÁRIOS DE DELAY

export const staggerDelay = (index: number, baseDelay = 0.1) => ({
  delay: index * baseDelay
});

export const randomDelay = (min = 0, max = 0.5) => ({
  delay: Math.random() * (max - min) + min
});

// 🌟 ANIMAÇÕES ESPECIAIS PARA O TEMA MAERAIZ

// Cores do tema
export const themeColors = {
  primary: '#4B6043',
  secondary: '#B17853',
  light: '#A3B18A',
  background: '#F9F4ED'
};

// Animação para ícones de mãe solo
export const maeSoloIcon: Variants = {
  idle: { scale: 1, rotate: 0 },
  hover: {
    scale: 1.1,
    rotate: [0, 5, -5, 0],
    transition: {
      duration: 0.5,
      ease: "easeInOut"
    }
  }
};

// Animação para ícones de profissional
export const profissionalIcon: Variants = {
  idle: { scale: 1, rotate: 0 },
  hover: {
    scale: 1.1,
    rotate: [0, -5, 5, 0],
    transition: {
      duration: 0.5,
      ease: "easeInOut"
    }
  }
};

// Gradient animado para fundos especiais
export const gradientShift: Variants = {
  animate: {
    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut"
    }
  }
};

export default {
  pageTransition,
  staggerContainer,
  slideUpItem,
  fadeIn,
  scaleIn,
  slideInLeft,
  slideInRight,
  rotateIn,
  shakeX,
  buttonHover,
  buttonTap,
  cardHover,
  pulse,
  float,
  backdropVariants,
  modalVariants,
  tabTransition,
  inputFocus,
  inputBlur,
  springTransition,
  easeTransition,
  quickTransition,
  slowTransition,
  staggerDelay,
  randomDelay,
  themeColors,
  maeSoloIcon,
  profissionalIcon,
  gradientShift
};