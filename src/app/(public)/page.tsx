"use client";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function HomePage() {
  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center bg-gray-200 p-5">
        <h1 className="font-bold text-3xl text-black">S.H.E.Y</h1>
        <Button>
          <Link href="/login">Login</Link>
        </Button>
      </div>
      <div className="bg-white mt-20 lg:grid-cols-2 grid-cols-1 px-20 min-h-[70vh] items-center grid gap-10">
        <div className="col-span-1">
          <div>
            <h1 className="text-2xl fomt-bold">Welcome to SHEY-SALON-SPA</h1>
            <p className="text-sm text-gray-500">
              Shey-salon-spa is a platform then very good
            </p>
            <Button>Find Salon</Button>
          </div>
        </div>
        <div className="col-span-1 flex justify-center items-center">
           <Image 
            src="/images/spa.jpg"
            alt="home page image"
            width={500}
            height={500}
            className="object-cover"
           />
        </div>

      </div>
    </div>
  );
}
export default HomePage;
