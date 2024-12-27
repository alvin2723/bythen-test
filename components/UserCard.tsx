import Image from "next/image";
import React from "react";
import { Skeleton } from "./ui/Skeleton";
import { Dialog, DialogTrigger } from "./ui/Dialog";
import { UserEdit } from "./UserEdit";
import { User } from "@/lib/types";

export const UserCard = ({ user }: { user: User }) => {
  return (
    <Dialog>
      <DialogTrigger className="px-[10px] mx-auto lg:mx-0 md:px-5 lg:px-[25px] pt-[17px] pb-4 lg:pb-5 bg-grey w-full max-w-[200px] lg:max-w-[256px] h-[263px] flex flex-col items-center">
        <div className="size-[90px] relative">
          <Image
            src={user?.avatar}
            fill
            alt={user?.first_name}
            className="object-cover rounded-full"
          />
        </div>
        <p className="font-inter text-base lg:text-[20px] lg:leading-[24.2px] mt-6">
          {user?.first_name + " " + user?.last_name}
        </p>
        <p className="font-inter text-sm lg:text-base">{user?.email}</p>
        <div className="w-[143px] h-[38px] text-base lg:text-[20px] Lg:leading-[24.2px] py-[7px] bg-darkgrey rounded-[10px] mt-6">
          Edit
        </div>
      </DialogTrigger>
      <UserEdit user={user} />
    </Dialog>
  );
};

export const ShimmerCard = () => {
  return (
    <div className="px-[25px] pt-[17px] pb-[20px] mx-auto lg:mx-0 bg-grey w-[200px] lg:w-[256px] h-[263px] flex flex-col items-center">
      <Skeleton className="size-[90px] rounded-full" />
      <Skeleton className="w-full h-10 mt-6" />
      <Skeleton className="w-[95%] mx-auto h-10 mt-6" />
    </div>
  );
};
