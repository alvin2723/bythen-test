"use client";
import { Input } from "@/components/ui/Input";
import { useSidebar } from "@/hooks/useSidebar";
import Image from "next/image";
import { useState } from "react";

export const Header = ({
  search,
  setSearch,
}: {
  search: string;
  setSearch: (value: string) => void;
}) => {
  const { isOpen } = useSidebar();
  const [isSearchTrigger, setIsSearchTrigger] = useState(false);
  return (
    <div
      className={`relative pr-6 lg:pl-[42px] lg:ml-auto transition-all duration-200  ${
        isOpen
          ? "w-max lg:w-[calc(100%-276px)]"
          : "w-max lg:w-[calc(100%-76px)]"
      }`}
    >
      {isSearchTrigger === false && (
        <div
          className="relative w-10 h-10 lg:w-0 lg:h-0 lg:hidden cursor-pointer"
          onClick={() => setIsSearchTrigger(true)}
        >
          <Image src="/icons/search.svg" alt="Search" fill />
        </div>
      )}

      <Input
        className={` h-[52px] border-[1px] border-black py-[14px] px-[22px] text-[20px] font-inter transition-all bg-white lg:bg-transparent ${
          isSearchTrigger ? "w-[292px]" : "w-0 lg:w-[292px] hidden lg:block"
        }`}
        placeholder="Search here"
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};
