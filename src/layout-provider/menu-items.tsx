import React, { use } from "react";
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
import {
  Calendar,
  Calendar1,
  LayoutDashboard,
  List,
  MessageCircle,
  User2,
} from "lucide-react";
import { usePathname } from "next/navigation";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import usersGlobalStore, { IUserGlobalStore } from "@/store/users-global-store";

interface MenuItemsProps {
  openMenuItems: boolean;
  setOpenMenuItems: (openMenuItems: boolean) => void;
 
}

function MenuItems({ openMenuItems, setOpenMenuItems }: MenuItemsProps) {
  const {user} = usersGlobalStore() as IUserGlobalStore ;

  const pathname = usePathname();
  const router = useRouter();

  const onLogout = () => {
    // Perform logout logic here
    // For example, clear user session, redirect to login page, etc.
    console.log("User logged out");
    try {
      Cookies.remove("token");
      Cookies.remove("role");
      router.push("/login");
      toast.success("Logout successful");
    } catch (error: any) {
      toast.error("Logout failed. Please try again.");
    }
  };

  let userMenuItems = [
    {
      title: "Dashboard",
      route: "/user/dashboard",
      icon: <LayoutDashboard size={13} />,
    },
    {
      title: "Schedule Appointment",
      route: "/user/schedule-appointment",
      icon: <Calendar size={13} />,
    },
    {
      title: "My Appointments",
      route: "/user/my-appointments",
      icon: <List size={13} />,
    },
    {
      title: "Profile",
      route: "/user/profile",
      icon: <User2 size={13} />,
    },
  ];
  let salonSpaOwnerMenuItems = [
    {
      title: "Dashboard",
      route: "/salon-spa-owner/dashboard",
      icon: <LayoutDashboard size={13} />,
    },
    {
      title: "Salon & Spa",
      route: "/salon-spa-owner/salon-spa",
      icon: <List size={13} />,
    },
    {
      title: "Appointments",
      route: "/salon-spa-owner/appointments",
      icon: <Calendar1 size={13} />,
    },
    {
      title: "Freeback/Reviews",
      route: "/salon-spa-owner/feeback-reviews",
      icon: <MessageCircle size={13} />,
    },
    {
      title: "Profile",
      route: "/salon-spa-owner/profile",
      icon: <User2 size={13} />,
    },
  ];

  const menuItemsToRender =
    user?.role === "user" ? userMenuItems : salonSpaOwnerMenuItems;

  return (
    <Sheet open={openMenuItems} onOpenChange={setOpenMenuItems}>
      <SheetContent className="lg:min-w-[500px]">
        <SheetHeader>
          <SheetTitle></SheetTitle>
        </SheetHeader>
        <div className="flex flex-col gap-7 mt-20">
          {menuItemsToRender.map((item, index) => (
            <div
              className={`flex items-center gap-3 p-2 rounded-md cursor-pointer
                 ${
                   pathname === item.route
                     ? "bg-gray-100 border border-gray-500"
                     : "text-gray-500"
                 }`}
              key={index}
            >
              <div className="text-black">{item.icon}</div>

              <h1 className="text-sm">{item.title}</h1>
            </div>
          ))}
          <Button onClick={onLogout}>Logout</Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
export default MenuItems;
