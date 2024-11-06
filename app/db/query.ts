import { fetcherToStrapi } from "@/lib/fetcher.server"
import { setNewPagination } from "@/lib/pagination"
import { getCareerLocationData } from "@/services/career-cookie.server"
import { GetArticuloResponse, GetOneArticuloResponse } from "@/types"


export async function getArticleById(id: number | string, request: Request) {
  const res = await fetcherToStrapi<GetOneArticuloResponse>(
    `/articulos/${id}?populate[mantenimientos][populate][0]=encargado&populate[registrado]=registrado&populate[carrera]=carrera&populate[cambios][populate][0]=responsable&populate[mantenimientos][sort][0]=createdAt%3Adesc&populate[cambios][sort][0]=createdAt%3Adesc`,
    { request })
  return res
}


interface OptGetAllArticles {
  size?: number,
  actualPage?: number,
  search?: string,
  order?: 'asc' | 'desc'
}

export const getAllArticles = async ({ size = 1, actualPage = 1, search = '', order = 'desc' }: OptGetAllArticles, request: Request) => {
  try {
    const career = await getCareerLocationData(request)
    const entrySearch = search ? `&filters[nombre][$containsi]=${search}` : ''
    const data = await fetcherToStrapi<GetArticuloResponse>
      (`/articulos?pagination[page]=${actualPage}&pagination[pageSize]=${size}${entrySearch}&populate=*&sort=id:${order}&filters[carrera][$eq]=${career?.career?.id}`,
        { request })
    const pagination = setNewPagination(data.meta.pagination)
    return {
      data: data.data,
      meta: pagination,
    }
  } catch (error) {
    return {
      code: 500,
      message: 'Ha ocurrido un error en el servidor',
      data: null,
      meta: {}
    }
  }
}