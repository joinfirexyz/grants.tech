import { motion } from "framer-motion";

interface IBackgroundOverlayProps {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

const BackgroundOverlay: React.FC<IBackgroundOverlayProps> = ({
  children,
  onClick,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.25 }}
      className="fixed left-0 top-0 z-40 grid h-full w-full content-center overflow-hidden"
      onClick={onClick}
      style={{ backgroundColor: "rgba(49, 46, 69, 0.9)" }}
      id="backgroundOverlay"
    >
      {children}
    </motion.div>
  );
};

export default BackgroundOverlay;
