import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { UseFormRegister, FieldErrors, SubmitHandler, UseFormHandleSubmit } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";

interface CardRegisterProps {
  register: UseFormRegister<any>;
  handleSubmit: UseFormHandleSubmit<any>;
  onSubmit: SubmitHandler<any>;
  errors: FieldErrors<any>;
}

export default function CardRegister({ register, handleSubmit, onSubmit, errors }: CardRegisterProps) {
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle>Cadastro</CardTitle>
          <CardDescription>Crie sua conta</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="name">Nome</Label>
            <Input
              {...register("name")}
              type="text"
              placeholder="Digite seu nome"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message as string}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              {...register("email")}
              type="email"
              placeholder="Digite seu email"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message as string}</p>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              {...register("password")}
              type="password"
              placeholder="Digite sua senha"
            />
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message as string}</p>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex flex-col justify-center gap-2">
          <Button className="w-full cursor-pointer" type="submit">
            Cadastrar
          </Button>
          <p>ou</p>
          <Button className="w-full cursor-pointer" variant="outline">
            <FcGoogle className="mr-2 h-4 w-4" />
            Criar com Google
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}