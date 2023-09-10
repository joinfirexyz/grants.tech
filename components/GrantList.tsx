import { Grant } from "./Grant";
import { grants } from "./Grants";

interface GrantListProps {
  grants: any[];
  className?: string;
}

/**
 * Primary UI component for user interaction
 */
export const GrantList = ({ ...props }: GrantListProps) => {
  return (
    // map the grants to a list of Grant components
    <div className={`flex flex-col space-y-3  ${props.className}`}>
      {grants.map((grant, index) => (
        <Grant key={index} data={grant} />
      ))}
    </div>
  );
};
