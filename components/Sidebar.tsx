"use client";
import React from "react";
import { motion } from "framer-motion";
import { useSidebar } from "@/hooks/useSidebar";
import Image from "next/image";
import { useRouter } from "next/navigation";

export const Sidebar = () => {
  const { isOpen, toggleSidebar, isMobileOpen, toggleMobileSidebar } =
    useSidebar();
  const router = useRouter();

  const desktopSidebarVariants = {
    open: { width: "276px" },
    closed: { width: "76px" },
  };
  const mobileSidebarVariants = {
    open: { x: "0%" },
    closed: { x: "-100%" },
  };

  return (
    <>
      <button
        className="relative ml-4 lg:hidden w-10 h-10"
        onClick={toggleMobileSidebar}
      >
        <Image src={"/icons/caret.svg"} alt="caret" fill />
      </button>
      <motion.div
        initial={{ opacity: isMobileOpen ? 1 : 0 }}
        animate={{ opacity: isMobileOpen ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className={`bg-[#00000099] fixed h-screen z-50 top-0 left-0 cursor-pointer ${
          isMobileOpen ? "w-screen" : "w-0"
        }`}
        onClick={toggleMobileSidebar}
      />
      <motion.aside
        initial="closed"
        animate={isMobileOpen ? "open" : "closed"}
        variants={mobileSidebarVariants}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="bg-grey text-black h-screen overflow-hidden z-[999] pt-12 fixed top-0 left-0 px-4 lg:hidden w-[276px]"
      >
        <button
          className="absolute top-6 left-4 z-50  lg:hidden w-10 h-10"
          onClick={toggleMobileSidebar}
        >
          <Image src={"/icons/caret.svg"} alt="caret" fill />
        </button>
        <ul className="list-none flex flex-col mt-16">
          <li
            className="w-[146px] flex gap-3 items-center cursor-pointer"
            onClick={() => router.push("/")}
          >
            <Image
              src={"/icons/verified-user.svg"}
              alt="Verified User"
              width={50}
              height={42}
              className="w-[50px] h-[42px]"
            />
            <motion.p
              className="text-[28px] leading-[33.89px] font-inter"
              initial={{ opacity: isOpen ? 1 : 0 }}
              animate={{ opacity: isOpen ? 1 : 0 }}
              transition={{ duration: 0.2 }}
            >
              Reqmi
            </motion.p>
          </li>
          <li
            className="w-[146px] mt-[46px] flex gap-3 items-center group cursor-pointer"
            onClick={() => router.push("/")}
          >
            <Image
              src={"/icons/user.svg"}
              alt="User"
              width={50}
              height={42}
              className="w-[50px] h-[42px]"
            />
            <motion.p
              className="text-[28px] leading-[33.89px] font-inter"
              initial={{ opacity: isOpen ? 1 : 0 }}
              animate={{ opacity: isOpen ? 1 : 0 }}
              transition={{ duration: 0.2 }}
            >
              Connections
            </motion.p>
          </li>
        </ul>
      </motion.aside>
      <motion.aside
        initial="open"
        animate={isOpen ? "open" : "closed"}
        variants={desktopSidebarVariants}
        transition={{ duration: 0.2 }}
        className="bg-grey text-black h-screen overflow-hidden z-[999] pt-12 fixed top-0 left-0 px-4 hidden lg:flex"
      >
        <ul className="list-none flex flex-col">
          <li
            className="w-[146px] flex gap-3 items-center cursor-pointer"
            onClick={() => router.push("/")}
          >
            <Image
              src={"/icons/verified-user.svg"}
              alt="Verified User"
              width={50}
              height={42}
              className="w-[50px] h-[42px]"
            />
            <motion.p
              className="text-[28px] leading-[33.89px] font-inter"
              initial={{ opacity: isOpen ? 1 : 0 }}
              animate={{ opacity: isOpen ? 1 : 0 }}
              transition={{ duration: 0.2 }}
            >
              Reqmi
            </motion.p>
          </li>
          <li
            className="w-[146px] mt-[141px] flex gap-3 items-center group cursor-pointer"
            onClick={() => router.push("/")}
          >
            <Image
              src={"/icons/user.svg"}
              alt="User"
              width={50}
              height={42}
              className="w-[50px] h-[42px]"
            />
            <motion.p
              className="text-[28px] leading-[33.89px] font-inter"
              initial={{ opacity: isOpen ? 1 : 0 }}
              animate={{ opacity: isOpen ? 1 : 0 }}
              transition={{ duration: 0.2 }}
            >
              Connections
            </motion.p>
          </li>
        </ul>
        {/* Menu Button when minimized */}
        <motion.div
          initial={{ opacity: isOpen ? 0 : 1 }}
          animate={{ opacity: isOpen ? 0 : 1 }}
          transition={{ duration: 0.2 }}
          className={`absolute bottom-5 left-[50%] translate-x-[-50%] ${
            isOpen ? "hidden" : "block"
          }`}
        >
          <button onClick={toggleSidebar} className=" cursor-pointer">
            <Image
              src={"/icons/arrow-right.svg"}
              alt="Arrow"
              width={50}
              height={42}
              className="w-[50px] h-[42px]"
            />
          </button>
        </motion.div>
        {/* Toggle Button */}
        <motion.div
          initial={{ x: isOpen ? "0" : "-100%" }}
          animate={{ x: isOpen ? "0" : "-100%" }}
          transition={{ duration: 0.2 }}
          className="absolute bottom-10 left-5 cursor-pointer  text-black text-[28px] leading-[33.89px] font-inter"
          onClick={toggleSidebar}
        >
          {isOpen ? (
            <div className="w-[146px] flex gap-3 items-center">
              <Image
                src={"/icons/arrow-back.svg"}
                alt="Arrow"
                width={50}
                height={42}
                className="w-[50px] h-[42px]"
              />
              <p className="text-[28px] leading-[33.89px] font-inter">Hide</p>
            </div>
          ) : (
            ""
          )}
        </motion.div>
      </motion.aside>
    </>
  );
};
