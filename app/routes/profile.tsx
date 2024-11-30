import InputLabel from "@/components/input-label";
import { Button } from "@/components/ui";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { renderToaster } from "@/lib/utils";
import { requireCareerLocation } from "@/services/career-cookie";
import { getUserData } from "@/services/user-cookie";
import { ActionFunctionArgs, json, LoaderFunctionArgs } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";
import { useEffect, useRef } from "react";

const STRAPI_URL_API = process.env.STRAPI_URL_API;

export const loader = async ({request}: LoaderFunctionArgs) => {
  await requireCareerLocation(request);
  return null
}

export const action = async ({request}: ActionFunctionArgs) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const user = await getUserData(request)
  const headers = {
    Authorization: `Bearer ${user?.jwt}`,
    "Content-Type": "application/json",
  };
  const response = await fetch(`${STRAPI_URL_API}/auth/change-password`, {
    headers,
    body: JSON.stringify({
      "currentPassword": data.current_password,
      "password": data.new_password,
      "passwordConfirmation": data.confirm_password,
    }),
    method: 'post',
  });
  const dataResponse = await response.json();

  if(dataResponse.error) {
    const errors: string[] = []
    if(!dataResponse.error.details.errors) {
      errors.push(dataResponse.error.message)
    } else    {
      dataResponse.error.details.errors.forEach((error: any) => {
        errors.push( error.message  )
      })
    }
    return json({errors, data: null})
  }

  return json({errors: null, data: {message: 'Contraseña actualizada'}})
}

export default function ProfilePage() {
  const $form = useRef<HTMLFormElement>(null)
  const actionData =  useActionData<typeof action>()
  useEffect(() => {
    if(actionData?.data) {
      renderToaster({message: actionData.data.message, type: 'success', detail: 'Operación exitosa'})
      $form.current?.reset()
      return
    }

  }, [actionData])
  return (
    <>
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Cambiar contraseña</CardTitle>
        </CardHeader>
        <CardContent>
          <Form ref={$form} method="post" className="flex flex-col gap-8 lg:flex-row">
            <div className="flex w-full flex-col gap-4">
            <InputLabel isRequired type="password" id="current_password" label="contraseña actual" placeholder="Contraseña" />

      {actionData?.errors &&
       <ul className="rounded bg-destructive/5 p-2 text-sm text-destructive">
          {actionData?.errors.map((error: any) => (
            <li className="list-item list-inside list-disc" key={error}>{error}</li>
          ) )}
      </ul>}

            </div>
            <div className="flex w-full flex-col gap-4">
              <InputLabel isRequired type="password" id="new_password" label="nueva contraseña" placeholder="Nueva contraseña" />
              <InputLabel isRequired type="password" id="confirm_password" label="confirmar contraseña" placeholder="Confirmar la contraseña" />
              <Button type="submit" className="w-full">Cambiar contraseña</Button>
            </div>
          </Form>
        </CardContent>
      </Card>
    </>
  )
}
