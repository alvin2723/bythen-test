"use client";
import { Sidebar } from "@/components/Sidebar";
import UserList from "./UserList";
import { useState } from "react";
import { Header } from "@/components/Header";

export default function Home() {
  const [search, setSearch] = useState("");
  return (
    <main className="w-full h-full overflow-hidden">
      <div className="bg-grey w-full flex items-center justify-between lg:bg-transparent py-6 lg:pt-[31px] lg:pb-0">
        <Sidebar />
        <Header search={search} setSearch={setSearch} />
      </div>

      <UserList search={search} />
    </main>
  );
}
