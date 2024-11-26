// @ts-nocheck

import { Article } from "@/data"
import { fetcherToStrapi } from "@/lib/fetcher"
import { getCareerLocationData } from "@/services/career-cookie"
import { getUserData } from "@/services/user-cookie"
import { Facultad } from "@/types"

export const getAllFaculty = async (request: Request) => {
  const res = await fetcherToStrapi('/facultades?populate=*', { request })
  if (res.error) {
    return []
  }
  return res.data as Facultad[]
}

export const getFacultyByUser = async (request: Request) => {
  const user = await getUserData(request)
  const res = await fetcherToStrapi(`/area-permisos?populate[user]=*&filters[user][$eq]=${user?.user?.id}&populate[carrera][populate][0]=facultad`, { request })
  const hola = res.data as []
  if (res.error) {
    return []
  }
  const groupedData = hola.reduce((acc, item) => {
    const facultadNombre = item.carrera.facultad.nombre;

    if (!acc[facultadNombre]) {
      acc[facultadNombre] = {
          id: item.carrera.facultad.id,
          habilitado: item.carrera.facultad.habilitado,
          nombre: facultadNombre,
          descripcion: item.carrera.facultad.descripcion,
          createdAt: item.carrera.facultad.createdAt,
          updatedAt: item.carrera.facultad.updatedAt,
          carreras: [],
      };
    }

    const carreraData = {
      is_supervisor: item.is_supervisor,
      id: item.carrera.id,
      habilitado: item.carrera.habilitado,
      nombre: item.carrera.nombre,
      descripcion: item.carrera.descripcion,
      createdAt: item.carrera.createdAt,
      updatedAt: item.carrera.updatedAt
    };

    acc[facultadNombre].carreras.push(carreraData);
    return acc;
  }, {});

  const result = Object.values(groupedData) as Facultad[];

  return result
}

export async function searchArticlesInCarreer(request: Request) {
  const carrera = await getCareerLocationData(request)
  const carreraID = carrera?.career?.id
  const res = await fetcherToStrapi(`/articulos?filters[carrera][$eq]=${carreraID}&pagination[pageSize]=100`, { request })
  if (res.error) {
    return []
  }
  const data = res.data as Article[]
  const gropedArticles = data.map((article) => article.aula).flat().filter((aula, index, self) => self.indexOf(aula) === index)
  return gropedArticles
}