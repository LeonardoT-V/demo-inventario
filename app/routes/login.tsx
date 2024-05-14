import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ROUTES_DIRECTION } from "@/lib/routes";
import { createUserSession } from "@/services/user-cookie.server";
import { LoginResponse } from "@/types";
import { ActionFunctionArgs, json } from "@remix-run/node";
import { Form } from "@remix-run/react";

export async function action({ request }: ActionFunctionArgs) {
  try {
    const form = await request.clone().formData();
    const email = form.get("email");
    const password = form.get("password");
    console.log({ email, password });
    const value = JSON.stringify({
      username: "hola",
      email,
      password,
    });
    const hola = await fetch("http://localhost:1337/api/auth/local/register", {
      body: value,
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    const { jwt, user, error }: LoginResponse = await hola.json();
    if (error) throw { [error.name]: error.message };
    console.log(user);
    return createUserSession(
      { jwt, user },
      ROUTES_DIRECTION["select-place"].path
    );
  } catch (error) {
    return json(error);
  }
}

export default function login() {
  return (
    <main className="bb relative flex size-full items-center justify-center align-middle">
      <Card className="w-96">
        <CardHeader>
          <img
            className="mx-auto aspect-square size-32 object-contain"
            src="/LOGO-ULEAM.png"
            alt="foto de la universidad uleam"
          />
          <CardTitle className="text-2xl">Iniciar Sesión</CardTitle>
          <CardDescription>Sistema de inventario ...</CardDescription>
        </CardHeader>
        <CardContent>
          <Form method="post" className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">Email:</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="Correo electronico"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">Contraseña:</Label>
              <Input
                id="password"
                type="password"
                name="password"
                placeholder="********"
              />
            </div>
            <Button type="submit" className="w-full">
              Entrar
            </Button>
          </Form>
        </CardContent>
        <CardContent className="flex items-center gap-4 text-center text-lg">
          <hr className="grow" />
          <span>o</span>
          <hr className="grow" />
        </CardContent>

        <CardFooter className="flex justify-center text-center">
          <p className="text-center text-xs text-primary underline">
            Registra tu cuenta aquí
          </p>
        </CardFooter>
      </Card>
    </main>
  );
}
