import { TIPO_EDIT_ARTICLE } from "@/lib/const";
import { fetcherToStrapi } from "@/lib/fetcher";
import { getUserData } from "@/services/user-cookie";
import { Articulo, Cambio, ReturnedMessage, TipoCambio } from "@/types";

export async function updateValueArticle(
  id: any,
  body: any,
  request: Request
): Promise<ReturnedMessage> {
  const resArticle = await fetcherToStrapi<Articulo>(`/articulos/${id}`, {
    request,
    body,
    method: "put",
  });
  if (resArticle.error) {
    return {
      message: "Ha ocurrido un error",
      detail: resArticle.error.message,
      type: "error",
    };
  }
  return {
    message: "Articulo actualizado",
    detail: "Se actualizo correctamente el articulo",
    type: "success",
  };
}

interface EditKeyValueArticle {
  tipo_register: TipoCambio;
  [x: string]: unknown;
}
export async function editKeyValueArticle(
  articleId: any,
  body: EditKeyValueArticle,
  request: Request
): Promise<ReturnedMessage> {
  const { tipo_register, ...newValue } = body;
  if (!Object.hasOwn(newValue, "habilitado")) {
    // @ts-expect-error this work
    newValue[body.llave] = body.new_value;
  }
  const updatedValue = await updateValueArticle(articleId, newValue, request);
  if (updatedValue.type === "error") {
    return updatedValue;
  }
  const userData = await getUserData(request);
  const user = userData?.user;
  const registeredValue = await addRegisterForArticle(
    tipo_register,
    {
      responsable: user?.id,
      articulo: articleId,
      comentario: body.comentario,
      prev_value: body.prev_value,
      llave: body.llave,
      new_value: body.new_value || "",
    },
    request
  );
  if (registeredValue.type === "error") {
    return registeredValue;
  }
  return {
    message: "Articulo actualizado",
    detail: "Se actualizo correctamente el articulo",
    type: "success",
  };
}

export async function addRegisterForArticle(
  type: TipoCambio,
  body: any,
  request: Request
): Promise<ReturnedMessage> {
  switch (type) {
    case TIPO_EDIT_ARTICLE.CREATE:
      body = { tipo: TIPO_EDIT_ARTICLE.CREATE, ...body };
      break;
    case TIPO_EDIT_ARTICLE.EDIT:
      body = { tipo: TIPO_EDIT_ARTICLE.EDIT, ...body };
      break;
    case TIPO_EDIT_ARTICLE.DISABLE:
      body = { tipo: TIPO_EDIT_ARTICLE.DISABLE, ...body };
      break;
    case TIPO_EDIT_ARTICLE.ACTIVE:
      body = { tipo: TIPO_EDIT_ARTICLE.ACTIVE, ...body };
      break;
    case TIPO_EDIT_ARTICLE.MOVE:
      body = { tipo: TIPO_EDIT_ARTICLE.MOVE, ...body, new_value: body.carrera };
      break;
    default:
      return {
        message: "Ha ocurrido un error",
        detail: "Tipo de actualizacion invalida, comunique al administrador",
        type: "error",
      };
  }

  const res = await fetcherToStrapi<Cambio>(`/cambios`, {
    request,
    body,
    method: "post",
  });

  if (res.error) {
    return {
      message: "Ha ocurrido un error",
      detail: res.error.message,
      type: "error",
    };
  }
  return {
    message: "Articulo actualizado",
    detail: "Se actualizo correctamente el articulo",
    type: "success",
  };
}

export async function moveArticleDirectory(
  id: any,
  body: any,
  request: Request
): Promise<ReturnedMessage> {

  const moveResponse = await fetcherToStrapi<Articulo>(`/articulos/${id}`, {
    request,
    body: { carrera: body.carrera, aula: body.aula },
    method: "put",
  });

  if (moveResponse.error) {
    return {
      message: "Ha ocurrido un error",
      detail: moveResponse.error.message,
      type: "error",
    };
  }

  const userData = await getUserData(request);
  const user = userData?.user;
  const registeredValue = await fetcherToStrapi<Cambio>(`/cambios`, {
    request,
    body: {
      responsable: user?.id,
      tipo: TIPO_EDIT_ARTICLE.MOVE,
      articulo: id,
      comentario: body.aula,
      prev_value: body.prev_value,
      llave: 'carrera',
      // @ts-expect-error El nombre del articulo llega
      new_value: moveResponse.data.nombre,
    },
    method: "post",
  });

  if (registeredValue.error) {
    return {
      message: "Ha ocurrido un error",
      detail: registeredValue.error.message,
      type: "error",
    };
  }

  return {
    message: "Articulo actualizado",
    detail: "Se actualizo correctamente el articulo",
    type: "success",
  };
}
