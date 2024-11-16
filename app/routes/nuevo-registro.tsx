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
import { getUserData } from "@/services/user-cookie";

import type {
  ActionFunctionArgs,
  MetaFunction,
  LoaderFunctionArgs,
} from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { redirect } from "@remix-run/node";
import { ROUTES } from "@/lib/routes";

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
  const hola = await request.formData();
  const location = await getCareerLocationData(request);
  const user = await getUserData(request);
  const pp = Object.fromEntries(hola);

  const parsedData = {
    nombre: pp.nombre,
    descripcion: pp.descripcion,
    condicion: pp.condicion,
    aula: pp.aula,
    carrera: location?.career?.id,
    registrado: user?.user?.id,
    url_img: pp.imagen,
  };
  const psoe = await createNewArticleEntry(parsedData, user?.jwt);
  return redirect(`${ROUTES.inventario.path}/${psoe.data.id}`);
};

export default function NuevoRegistro() {
  const { location } = useLoaderData<typeof loader>();
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
