import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ROUTES_DIRECTION } from "@/lib/routes";
import { createUserSession } from "@/services/user-cookie";
import { LoginResponse } from "@/types";
import { ActionFunctionArgs, json } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
const STRAPI_URL_API = process.env.STRAPI_URL_API
export async function action({ request }: ActionFunctionArgs) {
  try {
    const form = await request.clone().formData();
    const email = form.get("email");
    const password = form.get("password");
    const formValue = JSON.stringify({
      identifier: email,
      password,
    });
    const response = await fetch(`${STRAPI_URL_API}/auth/local`, {
      body: formValue,
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
    });

    const { jwt, user, error }: LoginResponse = await response.json();
    if (error) throw  error.message;
    const userRoleRes = await fetch(`${STRAPI_URL_API}/users/me?populate=role`, {
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${jwt}`,
      }
    });

    const userRole =await userRoleRes.json()

    return createUserSession(
      { jwt, user:{...user, role: userRole.role! } },
      ROUTES_DIRECTION["select-place"].path
    );
  } catch (error) {
    return json({error});
  }
}

export default function login() {
  const actionData = useActionData<typeof action>();

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
          <CardDescription>Ingrese sus credenciales de acceso.</CardDescription>
        </CardHeader>
        <CardContent>
          <Form method="post" className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label isRequired htmlFor="email" label="Email:"/>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="Correo electronico"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label label="Contraseña:" isRequired htmlFor="password"/>
              <Input
                id="password"
                type="password"
                name="password"
                placeholder="********"
              />
            </div>
            <p className="text-center text-xs text-destructive">{actionData?.error}</p>
            <Button type="submit" className="w-full">
              Entrar
            </Button>
          </Form>

        </CardContent>
      </Card>
    </main>
  );
}
