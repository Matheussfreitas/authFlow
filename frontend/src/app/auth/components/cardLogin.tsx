import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { UseFormRegister, FieldErrors, SubmitHandler, UseFormHandleSubmit } from "react-hook-form";
import { FcGoogle } from "react-icons/fc";

interface CardLoginProps {
  register: UseFormRegister<any>;
  handleSubmit: UseFormHandleSubmit<any>;
  onSubmit: SubmitHandler<any>;
  errors: FieldErrors<any>;
  onGoogleLogin: () => void;
}

export default function CardLogin({ register, handleSubmit, onSubmit, errors, onGoogleLogin }: CardLoginProps) {
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle>Login</CardTitle>
          <CardDescription>Acesse sua conta</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
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
            Entrar
          </Button>
          <p>ou</p>
          <Button className="w-full cursor-pointer" variant="outline" onClick={onGoogleLogin}>
            <FcGoogle className="mr-2"/>
            Continuar com Google
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}