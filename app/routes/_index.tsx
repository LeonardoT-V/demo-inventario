import { Card, CardContent, CardHeader } from "@/components/ui/card";
import type { MetaFunction } from "@remix-run/node";
import SectionWithHeader from "@/components/section-header";
import { IconPlusCircle, IconZoom } from "@/lib/icons";
import { Link, json, useLoaderData } from "@remix-run/react";
import { ROUTES } from "@/lib/routes";
import { getAllArticles } from "@/db/query";
import { Button } from "@/components/ui";
import ListArticles from "@/components/inventario/list-articles";

export const meta: MetaFunction = () => {
  return [
    { title: "Sistema Inventario" },
    { name: "description", content: "Sistema de inventario de la institución" },
  ];
};

export const loader = async () => {
  return json({ articulos: await getAllArticles({ size: 4 }) });
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
          <Link to={ROUTES["nuevo-registro"].path}>
            <Card
              className="cursor-pointer shadow-none transition-all hover:-translate-y-1 hover:text-primary"
              asHover
            >
              <CardHeader>
                <IconZoom className="mx-auto size-10" />
              </CardHeader>
              <CardContent>
                <h4 className="text-center text-sm">Buscar por nombre</h4>
              </CardContent>
            </Card>
          </Link>
        </div>
      </SectionWithHeader>
      {articulos.data && (
        <SectionWithHeader title="Añadidos Recientemente">
          <>
            <div className="grid grid-cols-2 gap-2 lg:grid-cols-3 xl:grid-cols-5">
              <ListArticles articulos={articulos.data} />
            </div>
            <Button asChild className="mx-auto w-64">
              <Link to={ROUTES["inventario"].path}>Ver Todos</Link>
            </Button>
          </>
        </SectionWithHeader>
      )}
    </>
  );
}
