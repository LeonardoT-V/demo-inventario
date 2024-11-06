import CardWithDetailsArticle from "@/components/card-details-article";
import SectionWithHeader from "@/components/section-header";
import TableMantenimientos from "@/components/table-mantenimiento";
import TextChangedArticle from "@/components/text-changed-article";
import { QRCode } from "@/components/ui";
import ImageViewer from "@/components/ui/image-viewer";
import { getArticleById } from "@/db/query";
import {
  editKeyValueArticle,
  moveArticleDirectory,
} from "@/db/query.articulos";
import { getAllFaculty } from "@/db/query.facultad";
import { registerNewMaintance } from "@/db/query.mantenimiento";
import { TIPO_EDIT_ARTICLE } from "@/lib/const";
import { IconReload } from "@/lib/icons";
import { ROUTES, ACTIONS_MAINTANCE, ACTIONS_ARTICLE } from "@/lib/routes";
import { renderToaster } from "@/lib/utils";
import { requireCareerLocation } from "@/services/career-cookie.server";
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  json,
  redirect,
} from "@remix-run/node";
import { useActionData, useLoaderData } from "@remix-run/react";
import { useEffect } from "react";
import { ClientOnly } from "remix-utils/client-only";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  await requireCareerLocation(request);
  const { data: articulo } = await getArticleById(params.invId!, request);
  if (articulo === null) {
    return redirect(ROUTES.inicio.path);
  }
  return json({ article: articulo, facultades: await getAllFaculty(request) });
};

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const values = await request.clone().formData();
  const { _action, ...data } = Object.fromEntries(values);
  if (_action === ACTIONS_MAINTANCE.REGISTER) {
    return await registerNewMaintance(
      { articulo: params.invId, ...data },
      request
    );
  }
  if (_action === ACTIONS_ARTICLE.DISABLE) {
    return await editKeyValueArticle(
      params.invId,
      {
        habilitado: false,
        tipo_register: TIPO_EDIT_ARTICLE.DISABLE,
        ...data,
      },
      request
    );
  }
  if (_action === ACTIONS_ARTICLE.ACTIVE) {
    return await editKeyValueArticle(
      params.invId,
      {
        habilitado: true,
        tipo_register: TIPO_EDIT_ARTICLE.ACTIVE,
        ...data,
      },
      request
    );
  }
  if (_action === ACTIONS_ARTICLE.EDIT) {
    return await editKeyValueArticle(
      params.invId,
      { tipo_register: TIPO_EDIT_ARTICLE.EDIT, ...data },
      request
    );
  }
  if (_action === ACTIONS_ARTICLE.MOVE) {
    const response = await moveArticleDirectory(
      params.invId,
      { tipo_register: TIPO_EDIT_ARTICLE.MOVE, ...data },
      request
    );
    if (response.type === "error") {
      return response;
    }
    return redirect(ROUTES.inventario.path);
  }
  return undefined;
};

export default function ArticuloPage() {
  const { article, facultades } = useLoaderData<typeof loader>();
  const actionData = useActionData<typeof action>();

  useEffect(() => {
    if (actionData) {
      renderToaster({
        detail: actionData.detail,
        message: actionData.message,
        type: actionData.type,
      });
    }
  }, [actionData]);

  const qrvalue = `Nombre:${article.nombre}
Creado el: ${article.createdAt}
Registrado por: ${article.registrado.email}
Ubicación: ${article.carrera.nombre}
Codigo: ${article.id}`;
  return (
    <>
      <SectionWithHeader>
        <section className="flex flex-col gap-4 lg:flex-row">
          <aside className="flex flex-row space-y-8 lg:flex-col">
            <ImageViewer
              url_img={article.url_img}
              alt={`fotografia del articulo ${article.nombre}`}
              className="aspect-square size-72 rounded-lg object-cover 2xl:size-96"
            />
            <div className="mx-auto flex aspect-square size-60 items-center justify-center">
              <ClientOnly
                fallback={<IconReload className="size-12 animate-spin" />}
              >
                {() => <QRCode value={qrvalue} title={article.nombre} />}
              </ClientOnly>
            </div>
          </aside>
          <CardWithDetailsArticle article={article} facultades={facultades} />
        </section>
      </SectionWithHeader>
      <SectionWithHeader title="Actualizaciones recientes">
        {article.cambios.map((c) => (
          <TextChangedArticle changes={c} key={c.id} />
        ))}
      </SectionWithHeader>
      <SectionWithHeader title="Mantenimientos">
        <TableMantenimientos mantenimientos={article.mantenimientos} />
      </SectionWithHeader>
    </>
  );
}
