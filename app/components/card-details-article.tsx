import ContentLabelWithText from "@/components/content-label-text";
import { IconCross, IconDot, IconEdit, IconLocation } from "@/lib/icons";
import { Button, Badge } from "@/components/ui";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import SectionWithHeader from "@/components/section-header";
import { Articulo } from "@/types";
export default function CardWithDetailsArticle({
  article,
}: {
  article: Articulo;
}) {
  return (
    <Card className="flex-1">
      <CardHeader>
        <header>
          <CardTitle className="text-balance text-4xl font-medium capitalize">
            {article.nombre}
          </CardTitle>
          <CardDescription className="text-balance">
            {article.descripcion}
          </CardDescription>
        </header>
        <footer className="flex items-center justify-between">
          <Badge
            variant="outline"
            className="h-fit border-transparent  bg-sky-200 py-1.5 text-sky-700 dark:bg-sky-950 dark:text-sky-200"
          >
            <IconDot />
            {article.condicion.detalle}
          </Badge>
          <div className="flex gap-1.5">
            <Button variant="outline">
              <IconEdit className="mr-1.5" /> Editar
            </Button>
            <Button variant="outline">
              <IconLocation className="mr-1.5" />
              Reubicar
            </Button>
            <Button variant="destructive">
              <IconCross className="mr-1.5" />
              Deshabilitar
            </Button>
          </div>
        </footer>
      </CardHeader>
      <CardContent className="space-y-4">
        <SectionWithHeader title="Datos">
          <div>
            <h4 className="text-sm text-muted-foreground ">Registrado el:</h4>
            <p className="text-lg font-light">{article.createdAt}</p>
          </div>
        </SectionWithHeader>
        <SectionWithHeader title="Ubicación">
          <div className="grid grid-cols-2 gap-1.5">
            <div>
              <h4 className="text-sm text-muted-foreground ">Carrera</h4>
              <p className="text-lg font-light">{article.nombre}</p>
            </div>
            <div>
              <h4 className="text-sm text-muted-foreground ">Carrera</h4>
              <p className="text-lg font-light">{article.nombre}</p>
            </div>
            <ContentLabelWithText
              title="Carrera"
              description={article.nombre}
            />
          </div>
        </SectionWithHeader>
      </CardContent>
    </Card>
  );
}
