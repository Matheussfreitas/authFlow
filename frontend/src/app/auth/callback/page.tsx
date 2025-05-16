"use client";
import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { setCookie } from "nookies";

export default function AuthCallbackPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const token = searchParams.get("token");
    console.log("Token recebido:", token);
    if (!token) {
      console.error("Token não encontrado na URL");
      router.push("/auth");
      return;
    }
    setCookie(undefined, "authFlowToken", token, {
      maxAge: 60 * 60 * 1,
      path: "/",
    });
    router.push("/tasks");
  }, [searchParams]);

  return <p>Autenticando com Google...</p>;
}