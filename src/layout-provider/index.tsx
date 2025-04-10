"use client";
import React from "react";
import { usePathname } from "next/navigation";
import PrivateLayout from "./private-layout";
import PublicLayout from "./public-layout";

function LayoutProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isPrivate =
    pathname.startsWith("/user") || pathname.startsWith("/salon-spa-owner");
  if (isPrivate) {
    return <PrivateLayout>{children}</PrivateLayout>;
  }
  return <PublicLayout>{children}</PublicLayout>;
}
export default LayoutProvider;
