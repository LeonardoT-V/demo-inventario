import SectionWithHeader from "@/components/section-header";
import { getAllArticles } from "@/db/query";
import { json, useLoaderData } from "@remix-run/react";
import { LoaderFunctionArgs } from "@remix-run/node";
import paginationUtil from "@/lib/pagination";
import Paginator from "@/components/Paginator";
import InputSearchInventory from "@/components/inventario/input-search-inventory";
import ListArticles from "@/components/inventario/list-articles";
import { requireCareerLocation } from "@/services/career-cookie.server";
import GridContainer from "@/components/grid-container";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await requireCareerLocation(request);
  const requestParam = paginationUtil(new URL(request.url));
  return json({
    articulos: await getAllArticles(
      {
        size: requestParam.sizeParam,
        actualPage: requestParam.actualPage,
        search: requestParam.searchParam,
      },
      request
    ),
    params: requestParam,
  });
};

export default function Inventario() {
  const { articulos, params } = useLoaderData<typeof loader>();

  return (
    <>
      <SectionWithHeader title="Articulos agregados">
        <header className="mb-2.5 flex items-center justify-end gap-24">
          <InputSearchInventory />
        </header>
        <GridContainer>
          <ListArticles articulos={articulos.data} />
        </GridContainer>
        <footer>
          <Paginator pagination={articulos.meta} params={params} />
        </footer>
      </SectionWithHeader>
    </>
  );
}
