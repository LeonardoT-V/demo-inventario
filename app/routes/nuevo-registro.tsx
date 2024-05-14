import FormRegisterElement from "@/components/form-register-element";
import SectionWithHeader from "@/components/section-header";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import type { ActionFunctionArgs, MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Sistema Inventario - Registro de objeto" },
    {
      name: "description",
      content: "Registrar un nuevo objeto al sistema de inventario",
    },
  ];
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const hola = await request.formData();
  const pp = Object.fromEntries(hola);
  console.log(pp);
  return "hola";
};

export default function NuevoRegistro() {
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
          <FormRegisterElement />
        </CardContent>
      </Card>
    </SectionWithHeader>
  );
}
