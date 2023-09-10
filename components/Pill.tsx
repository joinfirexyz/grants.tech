import React from "react";

interface PillProps {
  primary?: boolean;
  children?: React.ReactNode;
}

const textStyles = {
  fontSize: "10px",
  fontWeight: "600",
  letterSpacing: " 0.015em",
  textAlign: "center" as const,
  color: "white",
};

/**
 * Primary UI component for user interaction
 */
export const Pill = ({ primary = false, ...props }: PillProps) => {
  const mode = primary ? "lavender" : "lightGray";
  return (
    <div
      style={textStyles}
      className={`bg-gray-100 px-2 w-fit rounded-full h-fit bg-${mode}`}
    >
      {props.children}
    </div>
  );
};
