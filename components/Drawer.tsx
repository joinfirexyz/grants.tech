import { AnimatePresence } from "framer-motion";
import Image from "next/image";
import * as React from "react";
import Exit from "../assets/Exit.png";
import BackgroundOverlay from "./BackgroundOverlay";
import SlideUpAnimation from "./SlideUpAnimation";

export interface DrawerProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  modalTitle?: JSX.Element;
  children: React.ReactNode;
}

const Drawer: React.FC<DrawerProps> = ({
  className,
  modalTitle,
  visible,
  setVisible,
  children,
}) => {
  const ref = React.useRef<HTMLDivElement>(null);

  // Logic currently only closes when clicked outside on BackgroundOverlay component
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (
        ref.current &&
        !ref.current.contains(event.target as Node) &&
        target.id === "backgroundOverlay"
      ) {
        setVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setVisible]);

  const exitButton = (
    <button
      className="fixed right-4 top-4 h-4 w-4"
      onClick={() => {
        setVisible(false);
      }}
    >
      <Image className="h-4" src={Exit} alt="" />
    </button>
  );

  return (
    <AnimatePresence>
      {visible && (
        <BackgroundOverlay>
          <SlideUpAnimation trigger={visible}>
            <div
              className={`h-auto w-full rounded-t-xl border-t bg-white ${className}`}
              ref={ref}
            >
              {!!modalTitle ? (
                <div className="flex w-full flex-row justify-center p-5">
                  <div className="w-full">{modalTitle}</div>
                  {exitButton}
                </div>
              ) : (
                exitButton
              )}
              <div>{children}</div>
            </div>
          </SlideUpAnimation>
        </BackgroundOverlay>
      )}
    </AnimatePresence>
  );
};

export default Drawer;
