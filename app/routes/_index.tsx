import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import SectionWithHeader from "@/components/section-header";
import { IconArchive, IconPlusCircle, IconZoom } from "@/lib/icons";
import { Link, json, useLoaderData } from "@remix-run/react";
import { ROUTES } from "@/lib/routes";
import { getAllArticles } from "@/db/query";
import { Button } from "@/components/ui";
import ListArticles from "@/components/inventario/list-articles";
import { requireCareerLocation } from "@/services/career-cookie.server";
import GridContainer from "@/components/grid-container";

export const meta: MetaFunction = () => {
  return [
    { title: "Sistema Inventario" },
    { name: "description", content: "Sistema de inventario de la institución" },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await requireCareerLocation(request);
  return json({ articulos: await getAllArticles({ size: 4 }, request) });
};

export default function Index() {
  const { articulos } = useLoaderData<typeof loader>();
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
