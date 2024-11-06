import { Articulo } from "@/types";
import CardLinkArticle from "../card-link-article";
import { IconArchive } from "@/lib/icons";
import NullContainer from "../null-container";

interface ListArticlesProps {
  articulos?: Articulo[] | null;
}

export default function ListArticles({ articulos }: ListArticlesProps) {
  if (articulos === null || articulos === undefined) {
    return (
      <NullContainer
        title="No se encontraron articulos"
        description="Busque con otro termino o comuníquese con el administrador"
        icon={IconArchive}
      />
    );
  }
  if (articulos.length === 0) {
    return (
      <NullContainer
        title="No hay articulos"
        description=""
        icon={IconArchive}
      />
    );
  }
  return articulos.map((article) => (
    <CardLinkArticle article={article} key={article.id} />
  ));
}
