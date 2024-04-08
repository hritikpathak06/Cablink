import { UserButton } from "@clerk/nextjs";
import Image from "next/image";

const Navbar = () => {
  return (
    <div className=" flex justify-between p-3 px-10 border-b-[2px] items-center">
      <div className=" flex gap-10 items-center">
        <Image src="/logo.png" width={120} height={100} alt="logo" />
        <div className="hidden md:flex gap-6">
          <h2 className=" hover:bg-gray-300 p-2 rounded-md cursor-pointer transition-all">
            Home
          </h2>
          <h2 className=" hover:bg-gray-300 p-2 rounded-md cursor-pointer">
            History
          </h2>
          <h2 className=" hover:bg-gray-300 p-2 rounded-md cursor-pointer">
            Help
          </h2>
        </div>
      </div>
      <UserButton afterSignOutUrl="/" />
    </div>
  );
};

export default Navbar;
