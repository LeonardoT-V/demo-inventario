import ContentLabelWithText from "@/components/content-label-text";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import SectionWithHeader from "@/components/section-header";
import { Articulo, Facultad } from "@/types";
import { FormatToDateIntl } from "@/lib/date";
import CreateMaintanceAction from "./actions/create-maintance";
import DisableArticleAction from "./actions/disable-article";
import ActiveArticleAction from "./actions/active-article";
import EditArticleInputAction from "./actions/editable-article-input";
import TransportArticleAction from "./actions/transport-article";
import { Form } from "@remix-run/react";
import { Button } from "./ui";
import { IconExcel } from "@/lib/icons";
import ReplaceImageAction from "./actions/replace-image";

export default function CardWithDetailsArticle({
  article,
  facultades,
  apiUrl,
  is_supervisor,
}: {
  article: Articulo;
  facultades: Facultad[];
  apiUrl: string;
  is_supervisor?: boolean;
}) {
  const registered = FormatToDateIntl(article.createdAt);
  const updatedAt = FormatToDateIntl(article.updatedAt);

  return (
    <Card className="flex-1 border-none bg-transparent">
      <CardHeader>
        <header className="mb-4 flex flex-col gap-2.5">
          {is_supervisor ? (
            <EditArticleInputAction
              size="4xl"
              llave="nombre"
              value={article.nombre}
            />
          ) : (
            <ContentLabelWithText
              size="4xl"
              title=""
              description={article.nombre}
            />
          )}
          {is_supervisor ? (
            <EditArticleInputAction
              size="xl"
              llave="descripcion"
              value={article.descripcion || "No hay descripción"}
            />
          ) : (
            <ContentLabelWithText
              size="xl"
              title="Descripción:"
              description={article.descripcion}
            />
          )}
          {is_supervisor ? (
            <EditArticleInputAction
              llave="condicion"
              label="Estado del articulo:"
              value={article.condicion}
            />
          ) : (
            <ContentLabelWithText
              title="Estado del articulo:"
              description={article.condicion}
            />
          )}
        </header>
        <footer className="flex items-center justify-between">
          <div className="flex flex-wrap justify-center gap-4 lg:justify-normal">
            {is_supervisor && (
              <TransportArticleAction
                articulo={article}
                facultades={facultades}
              />
            )}

            {is_supervisor && (
              <ReplaceImageAction imageId={article?.image?.id} />
            )}
            {is_supervisor && <CreateMaintanceAction />}
            {is_supervisor ? (
              article.habilitado ? (
                <DisableArticleAction />
              ) : (
                <ActiveArticleAction />
              )
            ) : null}

            <Form method="post">
              <Button
                className="w-full bg-emerald-600"
                type="submit"
                icon={<IconExcel className="mr-1.5" />}
              >
                <input type="hidden" name="_action" value="export_excel" />
                <input type="hidden" name="_apiUrl" value={apiUrl} />
                Exportar a excel
              </Button>
            </Form>
          </div>
        </footer>
      </CardHeader>
      <CardContent className="space-y-8">
        <SectionWithHeader title="Ubicación">
          <div className="flex flex-row flex-wrap justify-start gap-x-24 gap-y-4">
            <ContentLabelWithText
              title="Carrera:"
              description={article.carrera.nombre}
            />
            {is_supervisor ? (
              <EditArticleInputAction
                llave="aula"
                label="Aula:"
                value={article.aula}
              />
            ) : (
              <ContentLabelWithText title="Aula:" description={article.aula} />
            )}
          </div>
        </SectionWithHeader>

        <SectionWithHeader title="Registrado por">
          <section className="flex flex-row flex-wrap justify-start gap-x-24 gap-y-4">
            <ContentLabelWithText
              title="Email asociado:"
              description={article?.registrado?.email}
            />
            <ContentLabelWithText
              title="Nombres y apellidos:"
              description={`${article?.registrado.nombres} ${article?.registrado.apellidos}`}
            />
          </section>
        </SectionWithHeader>

        <SectionWithHeader title="Responsable">
          <section className="flex flex-row flex-wrap justify-start gap-x-24 gap-y-4">
            <ContentLabelWithText
              title="Email asociado:"
              description={article?.responsable?.email}
            />
            <ContentLabelWithText
              title="Nombres y apellidos:"
              description={`${article?.responsable?.nombres} ${article?.responsable?.apellidos}`}
            />
          </section>
        </SectionWithHeader>
        <SectionWithHeader title="Fechas">
          <section className="flex flex-row flex-wrap justify-start gap-x-24 gap-y-4">
            <ContentLabelWithText
              title="Registrado el:"
              description={registered}
            />

            <ContentLabelWithText
              title="Ultima actualización:"
              description={updatedAt}
            />
          </section>
        </SectionWithHeader>
      </CardContent>
    </Card>
  );
}
