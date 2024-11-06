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
export default function CardWithDetailsArticle({
  article,
  facultades,
}: {
  article: Articulo;
  facultades: Facultad[];
}) {
  const registered = FormatToDateIntl(article.createdAt);
  const updatedAt = FormatToDateIntl(article.updatedAt);

  return (
    <Card className="flex-1 border-none bg-transparent">
      <CardHeader>
        <header className="mb-4">
          <EditArticleInputAction
            size="4xl"
            llave="nombre"
            value={article.nombre}
          />
          <EditArticleInputAction
            size="xl"
            llave="descripcion"
            value={article.descripcion}
          />
        </header>
        <footer className="flex items-center justify-between">
          <div className="flex flex-wrap justify-center gap-1.5 lg:justify-normal">
            <TransportArticleAction
              articulo={article}
              facultades={facultades}
            />
            <CreateMaintanceAction />
            {article.habilitado ? (
              <DisableArticleAction />
            ) : (
              <ActiveArticleAction />
            )}
          </div>
        </footer>
      </CardHeader>
      <CardContent className="space-y-8">
        <SectionWithHeader title="Datos">
          <section className="grid gap-4 md:grid-cols-2">
            <ContentLabelWithText
              title="Registrado por:"
              description={article?.registrado?.email}
            />
            <EditArticleInputAction
              llave="condicion"
              label="Estado del articulo"
              value={article.condicion}
            />
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
        <SectionWithHeader title="Ubicación">
          <div className="grid grid-cols-2 gap-1.5">
            <ContentLabelWithText
              title="Carrera:"
              description={article.carrera.nombre}
            />
            <EditArticleInputAction
              llave="aula"
              label="Aula:"
              value={article.aula}
            />
          </div>
        </SectionWithHeader>
      </CardContent>
    </Card>
  );
}
