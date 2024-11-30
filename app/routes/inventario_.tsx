import SectionWithHeader from "@/components/section-header";
import { getAllArticles } from "@/db/query";
import { json, useLoaderData } from "@remix-run/react";
import { LoaderFunctionArgs } from "@remix-run/node";
import paginationUtil from "@/lib/pagination";
import Paginator from "@/components/Paginator";
import InputSearchInventory from "@/components/inventario/input-search-inventory";
import ListArticles from "@/components/inventario/list-articles";
import { requireCareerLocation } from "@/services/career-cookie";
import GridContainer from "@/components/grid-container";
import { Link } from "@/components/ui/navlink";
import { ROUTES } from "@/lib/routes";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  await requireCareerLocation(request);
  const requestParam = paginationUtil(new URL(request.url));
  return json({
    articulos: await getAllArticles(
      {
        size: requestParam.sizeParam,
        actualPage: requestParam.actualPage,
        search: requestParam.searchParam,
        subarea: requestParam.subarea,
      },
      request
    ),
    params: requestParam,
  });
};

export default function Inventario() {
  const { articulos, params} = useLoaderData<typeof loader>();

  return (
    <>
      <SectionWithHeader title="Articulos agregados">
        <header className="mb-2.5 flex flex-col items-end justify-end gap-x-24 gap-y-2.5 lg:flex-row">
          {params.subarea && <div className="flex items-center gap-2">
              <p className="font-semibold">Subarea: {params.subarea}</p>
              <Link to={ROUTES["inventario"].path} variant="destructive" size='sm'>
              X
              </Link>
            </div>}
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
