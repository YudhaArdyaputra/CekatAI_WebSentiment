/**
 * Animation Constants
 * Framer Motion animation variants for consistent animations across components
 */

// Standard container animation with staggered children
export const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15
        }
    }
};

// Standard item animation (fade in from bottom)
export const itemVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.8
        }
    }
};

// Mobile menu dropdown animation
export const mobileMenuVariants = {
    hidden: { opacity: 0, scale: 0.95, y: -20 },
    visible: { opacity: 1, scale: 1, y: 0 }
};

// Tab content fade animation
export const tabContentVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -20 }
};

// Card hover animation
export const cardHoverVariants = {
    rest: { scale: 1 },
    hover: { scale: 1.02, transition: { duration: 0.3 } }
};

// Spring transition config
export const springTransition = {
    type: "spring",
    stiffness: 300,
    damping: 30
};

// Smooth spring transition for tabs
export const tabSpringTransition = {
    type: "spring",
    bounce: 0.2,
    duration: 0.6
};
