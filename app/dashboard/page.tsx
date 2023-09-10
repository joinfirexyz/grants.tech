import { GrantList } from "../../components/GrantList";
import { grants } from "../../components/Grants";

export default function Homepage() {
  return (
    <div className="h-full w-full items-center justify-center flex flex-col space-y-5 bg-gray-50">
      <GrantList className="mt-5" grants={grants} />
    </div>
  );
}
