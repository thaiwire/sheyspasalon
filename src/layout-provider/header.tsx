
import { Menu } from "lucide-react";
import React from "react";
import MenuItems from "./menu-items";
import usersGlobalStore, { IUserGlobalStore } from "@/store/users-global-store";

function Header() {
  const {user} = usersGlobalStore() as IUserGlobalStore;
  
  const [openMenuItems, setOpenMenuItems] = React.useState(false);

  return (
    <div className="bg-primary p-5 text-white flex justify-between items-center">
      <h1 className="fold-bold text-white text-2xl">S.H.E.Y</h1>
      <div className="flex items-center gap-15">
        <h1 className="text-white text-sml">{user?.name}</h1>
        <Menu className="text-orange-500 cursor-pointer"
        size={30}
        onClick={() => setOpenMenuItems(true)}
         />
         {openMenuItems && <MenuItems openMenuItems={openMenuItems} 
         setOpenMenuItems={setOpenMenuItems}
        />}
        
      </div>
    </div>
  );
}
export default Header;
