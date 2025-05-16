"use client"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useState } from "react";
import * as yup from "yup";
import { login, register as registerApi } from "../../utils/axios";
import { useRouter } from "next/navigation";
import { setCookie } from "nookies";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import CardLogin from "./components/cardLogin";
import CardRegister from "./components/cardRegister";

export default function AuthPage() {
  const [activeTab, setActiveTab] = useState("login");
  const router = useRouter();

  const loginSchema = yup.object().shape({
    email: yup.string().email("O email não é válido").required("O email é obrigatório"),
    password: yup.string().required("A senha é obrigatória"),
  });

  const registerSchema = yup.object().shape({
    name: yup.string().required("O nome é obrigatório"),
    email: yup.string().email("O email não é válido").required("O email é obrigatório"),
    password: yup
      .string()
      .min(6, "A senha deve ter pelo menos 6 caracteres")
      .required("A senha é obrigatória"),
  });

  type FormLoginSchema = yup.InferType<typeof loginSchema>;
  type FormRegisterSchema = yup.InferType<typeof registerSchema>;

  const { 
    register, 
    handleSubmit, 
    formState: { errors: loginErrors }, 
    reset: resetLogin 
  } = useForm<FormLoginSchema>({
    resolver: yupResolver(loginSchema),
  });

  const {
    register: registerRegister,
    handleSubmit: handleSubmitRegister,
    formState: { errors: errorsRegister },
    reset: resetRegister
  } = useForm<FormRegisterSchema>({
    resolver: yupResolver(registerSchema),
  });

  const handleLogin = async (data: FormLoginSchema) => {
    try {
      const user = await login(data.email, data.password);
      if (user.message === "Usuario nao encontrado") {
        toast.error("Usuário não encontrado");
        return;
      }
      const token = user.token;
      setCookie(undefined, "authFlowToken", token, {
        maxAge: 60 * 60 * 1, // 1 hora
      });
      toast.success("Login realizado com sucesso!");
      router.push("/tasks");
    } catch (error) {
      console.error("Erro ao fazer login: ", error);
      toast.error("Erro ao realizar login. Tente novamente.");
    }
  };

  const handleRegister = async (data: FormRegisterSchema) => {
    try {
      const registerUser = await registerApi(data.name, data.email, data.password);
      if (registerUser.message === "Email ja cadastrado") {
        toast.error("Usuário já existe");
        return;
      }
      toast.success("Cadastro realizado com sucesso! Faça login para continuar.");
      setActiveTab("login");
      resetRegister();
    } catch (error: any) {
      console.error("Erro ao fazer cadastro: ", error);
      toast.error("Erro ao realizar cadastro. Tente novamente.");
    }
  };

  const handleGoogle = async () => {
    try {
      window.location.href = "http://localhost:3000/auth/google";
    } catch (error) {
      console.error("Error during Google login:", error);
    }
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full max-w-md">
        <TabsList className="w-full">
          <TabsTrigger value="login">Login</TabsTrigger>
          <TabsTrigger value="register">Cadastro</TabsTrigger>
        </TabsList>
        <TabsContent value="login">
          <CardLogin
            register={register}
            handleSubmit={handleSubmit}
            onSubmit={handleLogin}
            onGoogleLogin={handleGoogle}
            errors={loginErrors}
          />
        </TabsContent>

        <TabsContent value="register">
          <CardRegister
            register={registerRegister}
            handleSubmit={handleSubmitRegister}
            onSubmit={handleRegister}
            onGoogleRegister={handleGoogle}
            errors={errorsRegister}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
