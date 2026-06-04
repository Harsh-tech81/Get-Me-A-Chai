"use client"
import React, { useEffect } from 'react'
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
function Dashboard() {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "loading") return;
    if (!session) {
      router.push("/login");
    }
  }, [session, status, router]);

  return (
    <div>
      This is Dashboard Page.
    </div>
  )
}

export default Dashboard
