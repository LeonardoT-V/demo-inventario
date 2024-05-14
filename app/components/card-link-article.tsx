import { ROUTES } from "@/lib/routes";
import { Link } from "@remix-run/react";
import { Card, CardContent, CardHeader } from "./ui/card";
import type { Articulo } from "@/types";
import { IconHome } from "@/lib/icons";
import BadgeStatus from "./ui/badge-status";

export default function CardLinkArticle({ article }: { article: Articulo }) {
  const date = new Date(article.createdAt);
  const updateTime = new Intl.DateTimeFormat("es-EC", {
    day: "2-digit",
    month: "long",
    year: "2-digit",
  }).format(date);

  return (
    <Link to={`${ROUTES["inventario"].path}/${article.id}`}>
      <Card
        className="group cursor-pointer transition-all hover:-translate-y-1"
        asHover
      >
        <CardHeader className="p-2 pb-4">
          <img
            src="/com.jpg"
            alt="computador hp"
            className="aspect-square h-44 rounded-lg object-cover object-center"
          />
        </CardHeader>
        <CardContent className="space-y-3">
          <header>
            <h4 className="text-balance font-medium capitalize">
              {article.nombre}
            </h4>
            <h4 className="line-clamp-2 h-8 max-h-8 text-pretty text-xs text-muted-foreground">
              {article.descripcion}
            </h4>
          </header>
          <ul className="rounded-lg border bg-background p-3 transition-all group-hover:bg-primary/5">
            <h5 className="inline-flex items-center text-xs font-medium">
              <IconHome className="mr-1.5 size-3" /> Ubicación
            </h5>
            <li className="text-balance text-xs text-muted-foreground">
              {article.ubicacion}
            </li>
            <li className="text-balance text-xs text-muted-foreground">
              {/* {article.} */}
            </li>
          </ul>
          <footer className="flex items-center justify-between">
            <BadgeStatus
              content={article.condicion.detalle}
              className="group-hover:bg-primary/5"
            />
            <span className="text-xs  text-muted-foreground">{updateTime}</span>
          </footer>
        </CardContent>
      </Card>
    </Link>
  );
}
