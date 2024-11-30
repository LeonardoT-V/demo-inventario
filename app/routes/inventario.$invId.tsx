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
  updateValueArticle,
} from "@/db/query.articulos";
import { getAllFaculty } from "@/db/query.facultad";
import { deleteImage,  uploadImage } from "@/db/upload-image";
import { TIPO_EDIT_ARTICLE } from "@/lib/const";
import { FormartToExcelFile } from "@/lib/date";
import {  cambiosIdSchema, mantenimientoIdSchema } from "@/lib/excel";
import { IconReload } from "@/lib/icons";
import { ROUTES, ACTIONS_ARTICLE } from "@/lib/routes";
import { renderToaster } from "@/lib/utils";
import { requireCareerLocation } from "@/services/career-cookie";
import { getUserData } from "@/services/user-cookie";
import {
  ActionFunctionArgs,
  LoaderFunctionArgs,
  json,
  redirect,
} from "@remix-run/node";
import {ClientActionFunctionArgs, useActionData, useLoaderData } from "@remix-run/react";
import { useEffect } from "react";
import { ClientOnly } from "remix-utils/client-only";
import writeXlsxFile from "write-excel-file";

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const careerCookie = await requireCareerLocation(request);

  const userRole = careerCookie?.career?.is_supervisor ?? false
  const { data: articulo } = await getArticleById(params.invId!, request);
  if (articulo === null) {
    return redirect(ROUTES.inicio.path);
  }
  return json({ userRole: userRole,article: articulo, facultades: await getAllFaculty(request), apiUrl: process.env.STRAPI_URL_API, strapi_url: process.env.STRAPI_URL });
};

export const clientAction = async ({request, params,serverAction }: ClientActionFunctionArgs) => {


  const values = await request.clone().formData();
  const { _action,_apiUrl } = Object.fromEntries(values);
  if(_action === "export_excel") {
    const article = await fetch(`${_apiUrl}/articulos/${params.invId}?populate[mantenimientos][populate][0]=encargado&populate[cambios][populate][0]=responsable&pagination[pageSize]=100`)
    const {data} = await article.json()
    await writeXlsxFile([data.mantenimientos, data.cambios], {
      fileName: `${data.nombre}(${data.id})-${FormartToExcelFile()}.xlsx`,
      schema: [mantenimientoIdSchema, cambiosIdSchema],
      sheets: ['Mantenimientos', 'Registros']
    })
    return null
  }

  return await serverAction()
}

export const action = async ({ request, params }: ActionFunctionArgs) => {
  const values = await request.clone().formData();

  const { _action, ...data } = Object.fromEntries(values);

  if (_action === ACTIONS_ARTICLE.EDIT_IMAGE) {
    const user = await getUserData(request)
    if(data.id_image) {
      await deleteImage(data.id_image, user?.jwt)
    }
    const uploadResponse = await uploadImage(data.new_image, user!.jwt!)
    return await updateValueArticle(
      params.invId, {image: uploadResponse[0]?.id }, request
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
  return null;
};

export default function ArticuloPage() {

  const { article, facultades, apiUrl, userRole } = useLoaderData<typeof loader>();
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

  const url_image =  article?.image?.url ? `${article?.image?.url}` : undefined

  return (
    <>
      <SectionWithHeader>
        <section className="flex flex-col gap-4 lg:flex-row">
          <aside className="flex flex-row space-y-8 lg:flex-col">
              <ImageViewer
                url_img={url_image}
                alt={`fotografia del articulo ${article.nombre}`}
                className="z-0 aspect-square size-72 rounded-lg object-cover 2xl:size-96"
              />
            <div className="mx-auto flex aspect-square size-60 items-center justify-center">
              <ClientOnly
                fallback={<IconReload className="size-12 animate-spin" />}
              >
                {() => <QRCode value={article} title={article.nombre} />}
              </ClientOnly>
            </div>
          </aside>
          <CardWithDetailsArticle is_supervisor={userRole} apiUrl={apiUrl!} article={article} facultades={facultades} />
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
