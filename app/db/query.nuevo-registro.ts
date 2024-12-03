import { fetcherToStrapi } from "@/lib/fetcher";
import { uploadImage } from "./upload-image";
import { getUserData } from "@/services/user-cookie";
import { getCareerLocationData } from "@/services/career-cookie";
import { Articulo } from "@/types";

export async function createNewArticleEntry(data, request: Request) {
  const user = await getUserData(request);
  const location = await getCareerLocationData(request);

  const imageResponse = await uploadImage(data.image, user!.jwt!);
  const newImageId = imageResponse[0]?.id || null;

  const parsedData = {
    nombre: data.nombre,
    descripcion: data.descripcion,
    condicion: data.condicion,
    aula: data.aula,
    carrera: location?.career?.id,
    registrado: user?.user?.id,
    image: newImageId,
    responsable: data.responsable,
  };

  const response = await fetcherToStrapi<{ data: Articulo }>(`/articulos`, {
    request,
    body: parsedData,
    method: "post",
  });

  return response;
}
