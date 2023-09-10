import { motion, useAnimation } from 'framer-motion';
import React, { useEffect } from 'react';

interface ISlideUpAnimationProps {
  children: React.ReactNode;
  trigger: boolean;
}

const SlideUpAnimation: React.FC<ISlideUpAnimationProps> = ({
  children,
  trigger,
}) => {
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      y: trigger ? 0 : '100%', //We start from "beneath" the page on open, or at 100% full height on close to run the animation
      opacity: 1,
      transition: { duration: 0.25 },
    });
  }, [trigger]);

  return (
    <motion.div
      initial={{ y: '100%', opacity: 1 }}
      exit={{ y: '100%', opacity: 0 }}
      animate={controls}
      className="fixed inset-x-0 bottom-0"
    >
      {children}
    </motion.div>
  );
};

export default SlideUpAnimation;
