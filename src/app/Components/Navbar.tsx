import { HeartIcon, ShoppingCartIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-black p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-[20px] font-bold md:text-[24px">
          <Link href="/">My Image Search</Link>
        </div>
        <div className="flex space-x-4">
          <p className="flex items-center gap-2 text-gray-300 hover:text-white cursor-pointer ">
            <HeartIcon className="h-5 w-5  " />
            <span className="hidden md:block lg:block ">LightBoxes</span>
          </p>
          <p className="flex items-center gap-2 text-gray-300 hover:text-white cursor-pointer">
            <ShoppingCartIcon className="h-5 w-5" />
            <span className="hidden md:block lg:block">Cart</span>
          </p>
          <p
            className="text-gray-300 text-sm hover:text-white cursor-pointer rounded-sm p-2 pl-3 pr-3"
            style={{ border: "1px solid gray" }}
          >
            Sign in
          </p>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
