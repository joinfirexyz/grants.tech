
import React from 'react';

interface PillProps {
  primary?: boolean;
  children?: React.ReactNode;
}

/**
 * Primary UI component for user interaction
 */
export const Pill = ({
  primary = false,
  ...props
}: PillProps) => {
  const mode = primary ? 'lavender' : 'lightGray';
  return (
    <div className={`bg-gray-100 px-2 rounded-full h-fit bg-${mode}`}>{props.children}</div>
  );
};
