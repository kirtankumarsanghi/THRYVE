export const motionTokens = {
  duration: {
    instant: 0.12,
    fast: 0.2,
    normal: 0.32,
    slow: 0.48,
  },
  easing: {
    standard: [0.2, 0.8, 0.2, 1],
    emphasis: [0.22, 1, 0.36, 1],
    exit: [0.4, 0, 1, 1],
  },
  stagger: {
    tight: 0.06,
    normal: 0.1,
  },
};

export const animations = {
  pageTransition: {
    initial: { opacity: 0, y: 12 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
    transition: { duration: motionTokens.duration.normal, ease: motionTokens.easing.emphasis },
  },
  modalTransition: {
    initial: { opacity: 0, y: 12, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: 10, scale: 0.98 },
    transition: { duration: motionTokens.duration.fast, ease: motionTokens.easing.standard },
  },
  sidebarTransition: {
    initial: { x: -24, opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: -24, opacity: 0 },
    transition: { duration: motionTokens.duration.normal, ease: motionTokens.easing.standard },
  },
  staggerContainer: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: motionTokens.stagger.normal },
    },
  },
  staggerItem: {
    hidden: { opacity: 0, y: 8 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: motionTokens.duration.fast, ease: motionTokens.easing.standard },
    },
  },
  hoverCard: {
    whileHover: { y: -4, transition: { duration: motionTokens.duration.fast, ease: motionTokens.easing.standard } },
  },
  scaleUp: {
    initial: { opacity: 0, scale: 0.96 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: motionTokens.duration.fast, ease: motionTokens.easing.standard },
  },
};
