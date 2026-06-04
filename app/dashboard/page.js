"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useSession,signIn,signOut } from "next-auth/react";
function Dashboard() {
const router=useRouter();
  const { data: session } = useSession();
  if(!session){
    router.push("/login");
  }

  return <div>This is the Dashboard Page.</div>;
}

export default Dashboard;
