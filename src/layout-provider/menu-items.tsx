import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { IUser } from "@/interfaces";

interface MenuItemsProps {
   openMenuItems: boolean;
   setOpenMenuItems: (openMenuItems: boolean) => void; 
   user : IUser;
}

function MenuItems({openMenuItems, setOpenMenuItems, user}: MenuItemsProps) {
  return (
    <Sheet
        open={openMenuItems}
        onOpenChange={setOpenMenuItems}
    >
      <SheetContent>
        <SheetHeader>
          <SheetTitle></SheetTitle>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
export default MenuItems;
