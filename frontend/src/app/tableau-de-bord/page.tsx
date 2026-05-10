"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function DashboardIndex() {
  const router = useRouter();

  useEffect(() => {
    const userStr = localStorage.getItem("user");
    if (!userStr) {
      router.replace("/connexion");
      return;
    }
    const user = JSON.parse(userStr);
    if (user.role === "admin") router.replace("/tableau-de-bord/admin");
    else if (user.role === "domestic") router.replace("/tableau-de-bord/domestique");
    else router.replace("/tableau-de-bord/employeur");
  }, [router]);

  return <p className="text-center mt-20">Redirection...</p>;
}