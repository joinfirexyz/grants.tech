import Image from "next/image";
import fireLogo from "../assets/fire-burning-3.gif";

export default function FireBurningLoader() {
  return (
    <div className="no-scrollbar h-screen w-screen overflow-y-auto bg-gray-100">
      <div className="flex h-3/4 flex-col items-center justify-center space-y-4 p-6">
        <div className="flex items-center justify-center p-4">
          <Image
            className="mx-auto mb-1 h-[162px] w-auto cursor-pointer self-center"
            src={fireLogo}
            alt="Workflow"
          />
        </div>
      </div>
    </div>
  );
}
