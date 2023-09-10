import React from "react";
import { Grant } from "./Grant";
import {grants} from "./Grants";

interface GrantListProps {
  grants: GrantType[];
}

type GrantType = {
  title: string;
};

/**
 * Primary UI component for user interaction
 */
export const GrantList = ({ ...props }: GrantListProps) => {
  return (
    // map the grants to a list of Grant components
    <div className="flex flex-col">
      {grants.map((grant) => (
        <Grant data={grant}/>
      ))}
    </div>
  );
};
