"use client";
import React, { ChangeEvent, FormEvent, useState } from "react";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/Dialog";
import { User } from "@/lib/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateUser } from "@/lib/actions";
import { Input } from "./ui/Input";
import { Label } from "./ui/Label";
import { Loader2 } from "lucide-react";
export const UserEdit = ({
  user,
  setIsOpened,
}: {
  user: User;
  setIsOpened: (value: boolean) => void;
}) => {
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState<User>(user);

  const { mutate, isPending, isSuccess, isError, error, reset } = useMutation({
    mutationFn: updateUser,
    onSuccess: (updatedUser) => {
      const oldData = queryClient.getQueryData(["users"]);
      if (oldData) {
        const updatedPages = oldData?.pages.map((page: any) => {
          const updatedUsers = page.data.map((user: User) =>
            user.id === updatedUser.id ? updatedUser : user
          );
          return { ...page, users: updatedUsers };
        });

        queryClient.setQueryData(["users"], {
          ...oldData,
          pages: updatedPages,
        });
      }
    },
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    mutate(formData);
    setTimeout(() => {
      reset();
      setIsOpened(false);
    }, 2000);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Edit User?</DialogTitle>
        <DialogDescription>
          {isSuccess && (
            <div className="mt-4 font-inter text-green-500 w-full text-center">
              User updated successfully!
            </div>
          )}
          {isError && (
            <div className="mt-4 font-inter text-red-500 w-full text-center">
              Error: {error?.message}
            </div>
          )}
        </DialogDescription>
      </DialogHeader>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col md:flex-row gap-4 w-full">
          <div className="py-3 w-full md:w-1/2">
            <Label htmlFor="first_name">First name</Label>
            <Input
              type="text"
              name="first_name"
              value={formData.first_name}
              onChange={handleChange}
            />
          </div>

          <div className="py-3 w-full md:w-1/2">
            <Label htmlFor="last_name">Last name</Label>
            <Input
              type="text"
              name="last_name"
              value={formData.last_name}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="py-3">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <button
          type="submit"
          className="w-[143px] text-base lg:text-[20px] Lg:leading-[24.2px] py-3 px-2 bg-darkgrey rounded-[10px] mt-4"
          disabled={isPending}
        >
          {isPending ? (
            <Loader2 className="w-4 h-4 animate-spin mx-auto" />
          ) : (
            "Update User"
          )}
        </button>
      </form>
    </DialogContent>
  );
};
