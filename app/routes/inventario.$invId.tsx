import CardWithDetailsArticle from "@/components/card-details-article";
import SectionWithHeader from "@/components/section-header";
import { QRCode } from "@/components/ui";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getArticleById } from "@/db/query";
import { IconReload } from "@/lib/icons";
import { ROUTES } from "@/lib/routes";
import { LoaderFunctionArgs, json, redirect } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { ClientOnly } from "remix-utils/client-only";

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { data: articulo } = await getArticleById(params.invId!);
  if (articulo === null) {
    return redirect(ROUTES.inicio.path);
  }

  return json({ article: articulo });
};

export default function ArticuloPage() {
  const { article } = useLoaderData<typeof loader>();
  const qrvalue = `nombre:${article.nombre}
creado el:${article.createdAt}`;
  return (
    <>
      <SectionWithHeader title="Detalle del articulo">
        <section className="flex gap-4">
          <aside className="space-y-8">
            <img
              src="/com.jpg"
              alt={`fotografia del articulo ${article.nombre}`}
              className="aspect-square size-72 rounded-lg border object-cover"
            />
            <div className="mx-auto flex aspect-square size-60 items-center justify-center">
              <ClientOnly
                fallback={<IconReload className="size-12 animate-spin" />}
              >
                {() => <QRCode value={qrvalue} />}
              </ClientOnly>
            </div>
          </aside>
          <CardWithDetailsArticle article={article} />
        </section>
      </SectionWithHeader>
      <SectionWithHeader title="Movimientos">
        <Card>
          <CardHeader>
            <CardTitle>Ultimos movientos</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 ">
            <div className="flex flex-wrap items-center gap-1 text-sm">
              <p className="text-xs text-muted-foreground">
                [ {article.createdAt} ]
              </p>
              <p className="font-bold text-destructive">
                Ider Leonardo Toro Vega
              </p>
              <p className="text-destructive">ha deshabilitado el articulo</p>
            </div>
            <div className="flex flex-wrap items-center gap-1 text-sm">
              <p className="text-xs text-muted-foreground">
                [ {article.createdAt} ]
              </p>
              <p className="font-bold text-primary">Ider Leonardo Toro Vega</p>
              <p className="text-muted-foreground">
                ha reubicado el articulo hacia
              </p>
              <p className="font-bold text-primary">{article.ubicacion}</p>
              <span className="font-bold text-secondary-foreground">
                ({article.carrera?.nombre})
              </span>
            </div>
          </CardContent>
        </Card>
      </SectionWithHeader>
    </>
  );
}
