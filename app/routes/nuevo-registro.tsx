import FormRegisterElement from "@/components/form-register-element";
import SectionWithHeader from "@/components/section-header";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createNewArticleEntry } from "@/db/query.nuevo-registro";
import {
  getCareerLocationData,
  requireCareerLocation,
} from "@/services/career-cookie";

import type {
  ActionFunctionArgs,
  MetaFunction,
  LoaderFunctionArgs,
} from "@remix-run/node";
import { useActionData, useLoaderData, useNavigation } from "@remix-run/react";
import { json, redirect } from "@remix-run/node";
import { ROUTES } from "@/lib/routes";
import { renderToaster } from "@/lib/utils";
import { useEffect } from "react";

export const meta: MetaFunction = () => {
  return [
    { title: "Sistema Inventario - Registro de objeto" },
    {
      name: "description",
      content: "Registrar un nuevo objeto al sistema de inventario",
    },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await requireCareerLocation(request);
  return {
    location: (await getCareerLocationData(request))!,
  };
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const formData = await request.clone().formData();
  const valuesData = Object.fromEntries(formData);
  const entryCreated = await createNewArticleEntry(valuesData, request);

  if (entryCreated.error) {
    return json({
      detail: 'Ha ocurrido un error',
      message: 'Intenta nuevamente',
      type: 'error',
    });
  }

  return redirect(`${ROUTES.inventario.path}/${entryCreated.data.id}`);
};

export default function NuevoRegistro() {
  const { location } = useLoaderData<typeof loader>();
  const va =useNavigation();

  const actionData = useActionData<typeof action>();

  useEffect(() => {
    if (actionData) {
      renderToaster({
        detail: actionData.detail,
        message: actionData.message,
        type: 'error',
      });
    }
  }, [actionData]);

  useEffect(() => {
    if (va.state === 'submitting') {
      renderToaster({ message: 'Creando registro', type: 'info', detail: 'Este proceso tardar unos segundos' })
    }
  }, [va.state]);

  return (
    <SectionWithHeader title="Nuevo Registro">
      <Card>
        <CardHeader>
          <CardTitle>Agregar nuevo elemento</CardTitle>
          <CardDescription>
            Rellene el formulario con todos los datos requeridos para registrar
            un nuevo articulo
          </CardDescription>
        </CardHeader>
        <CardContent>
          <FormRegisterElement location={location} />
        </CardContent>
      </Card>
    </SectionWithHeader>
  );
}
