import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import SectionWithHeader from "@/components/section-header";
import { IconArchive, IconExcel, IconPlusCircle } from "@/lib/icons";
import { ClientActionFunctionArgs, Form, Link, json, useLoaderData } from "@remix-run/react";
import { ROUTES } from "@/lib/routes";
import { getAllArticles } from "@/db/query";
import { Button } from "@/components/ui";
import ListArticles from "@/components/inventario/list-articles";
import { requireCareerLocation } from "@/services/career-cookie";
import GridContainer from "@/components/grid-container";
import writeXlsxFile from "write-excel-file";
import { articleSchema, cambiosSchema, fetchForExcel, mantenimientoSchema } from "@/lib/excel";
import { FormartToExcelFile } from "@/lib/date";

export const meta: MetaFunction = () => {
  return [
    { title: "Sistema Inventario" },
    { name: "description", content: "Sistema de inventario de la institución" },
  ];
};
export const clientAction = async ({ request  }: ClientActionFunctionArgs) => {
  const values = await request.clone().formData();
  const { _action, _carrera,_apiUrl } = Object.fromEntries(values);
  if(_action === "export_excel") {
    const articles = await fetchForExcel(`${_apiUrl}/articulos?populate=*&sort=id&pagination[pageSize]=100&filters[carrera][$eq]=${_carrera}`)
    const mantenimientos = await fetchForExcel(`${_apiUrl}/mantenimientos?populate=*&sort=id&pagination[pageSize]=100`)
    const registros = await fetchForExcel(`${_apiUrl}/cambios?populate=*&sort=id&pagination[pageSize]=100`)
    await writeXlsxFile([articles, mantenimientos, registros], {
      fileName: `${articles[0].carrera.nombre}-${FormartToExcelFile()}.xlsx`,
      schema: [articleSchema, mantenimientoSchema, cambiosSchema],
      sheets: ['Articulos', 'Mantenimientos', 'Registros']
    })
    return null
  }

  return null
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const careerLocation = await requireCareerLocation(request);
  return json({ articulos: await getAllArticles({ size: 4 }, request), carrera: careerLocation!.career, apiUrl: process.env.STRAPI_URL_API });
};

export default function Index() {
  const { articulos,carrera,apiUrl } = useLoaderData<typeof loader>();
  return (
    <>
      <SectionWithHeader title="Operaciones">
        <div className="grid grid-cols-4 gap-4">
          <Link to={ROUTES["nuevo-registro"].path}>
            <Card
              className="cursor-pointer shadow-none transition-all hover:-translate-y-1 hover:text-primary"
              asHover
            >
              <CardHeader>
                <IconPlusCircle className="mx-auto size-10" />
              </CardHeader>
              <CardContent>
                <h4 className="text-center text-sm">Añadir Registro</h4>
              </CardContent>
            </Card>
          </Link>
          <Link to={ROUTES["inventario"].path}>
            <Card
              className="cursor-pointer shadow-none transition-all hover:-translate-y-1 hover:text-primary"
              asHover
            >
              <CardHeader>
                <IconArchive className="mx-auto size-10" />
              </CardHeader>
              <CardContent>
                <h4 className="text-center text-sm">Ver Articulos</h4>
              </CardContent>
            </Card>
          </Link>
          <Form
            method="post"
          >
            <button className="w-full" type="submit">
          <Card
              className=" cursor-pointer shadow-none transition-all hover:-translate-y-1 hover:text-primary"
              asHover
            >
              <CardHeader>
                <IconExcel className="mx-auto size-10" />
              </CardHeader>
              <CardContent>
                <h4 className="text-center text-sm">Exportar a Excel</h4>
              </CardContent>
              <input type="hidden" name="_action" value="export_excel" />
            <input type="hidden" name="_carrera" value={carrera?.id} />
            <input type="hidden" name="_apiUrl" value={apiUrl} />
            </Card>
            </button>
          </Form>
        </div>
      </SectionWithHeader>
      {articulos.data && (
        <SectionWithHeader title="Añadidos Recientemente">
          <>
            <GridContainer>
              <ListArticles articulos={articulos.data} />
            </GridContainer>
            <Link className="mx-auto" to={ROUTES["inventario"].path}>
              <Button className="w-full lg:w-96">Ver Todos</Button>
            </Link>
          </>
        </SectionWithHeader>
      )}
    </>
  );
}
