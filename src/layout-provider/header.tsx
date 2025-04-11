import { IUser } from "@/interfaces";
import { Menu } from "lucide-react";
import React from "react";
import MenuItems from "./menu-items";

function Header({ user }: { user: IUser }) {
  const [openMenuItems, setOpenMenuItems] = React.useState(false);

  return (
    <div className="bg-primary p-5 text-white flex justify-between items-center">
      <h1 className="fold-bold text-white text-2xl">S.H.E.Y</h1>
      <div className="flex items-center gap-15">
        <h1 className="text-white text-sml">{user?.name}</h1>
        <Menu className="text-orange-500 cursor-pointer"
        size={30}
        onClick={() => setOpenMenuItems(!openMenuItems)}
         />
         {openMenuItems && <MenuItems openMenuItems={openMenuItems} setOpenMenuItems={setOpenMenuItems} user={user} />}
        
      </div>
    </div>
  );
}
export default Header;
