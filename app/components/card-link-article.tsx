import { ROUTES } from "@/lib/routes";
import { Link } from "@remix-run/react";
import { Card, CardContent, CardHeader } from "./ui/card";
import type { Articulo } from "@/types";
import { IconDot, IconHome } from "@/lib/icons";
import { FormatToDateIntl } from "@/lib/date";
import ImageViewer from "./ui/image-viewer";

export default function CardLinkArticle({ article }: { article: Articulo }) {
  const updateTime = FormatToDateIntl(article.createdAt);

  return (
    <Link to={`${ROUTES["inventario"].path}/${article.id}`}>
      <Card
        className="group cursor-pointer transition-all hover:-translate-y-1"
        asHover
      >
        <CardHeader className="p-2.5">
          <ImageViewer
            url_img={article.url_img}
            alt={`imagen de ${article.nombre}`}
            className="aspect-square h-44 rounded-lg object-contain"
          />
          <header>
            <h4 className="text-balance font-medium capitalize">
              {article.nombre}
            </h4>
            <h4 className="line-clamp-2  text-pretty text-xs text-muted-foreground">
              {article.descripcion}
            </h4>
          </header>
        </CardHeader>
        <CardContent className="flex flex-col gap-3 p-2.5 pt-0">
          <footer className="flex flex-col flex-wrap justify-between gap-3 md:flex-row md:items-center">
            <span className="flex w-fit items-center rounded-lg border border-dashed bg-background p-0.5 pr-4 text-sm font-medium group-hover:bg-primary/5">
              {article.habilitado ? (
                <IconDot className="mr-1.5 text-primary" />
              ) : (
                <IconDot className="mr-1.5 text-destructive" />
              )}
              {article.condicion}
            </span>
            <span className="text-xs">
              Registrado:{" "}
              <span className="text-muted-foreground">{updateTime}</span>
            </span>
          </footer>
          <ul className="rounded-lg border bg-background p-1.5 px-3 transition-all group-hover:bg-primary/5">
            <h5 className="inline-flex items-center text-xs font-medium">
              <IconHome className="mr-1.5 size-3 text-primary" /> Ubicación
            </h5>
            <li className="text-balance text-xs text-muted-foreground">
              {article.aula}
            </li>
          </ul>
        </CardContent>
      </Card>
    </Link>
  );
}
