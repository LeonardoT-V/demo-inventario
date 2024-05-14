import { setNewPagination } from "@/lib/pagination"
import { GetArticuloResponse, GetOneArticuloResponse } from "@/types"

// const URL_BACKEND = 'http://localhost:1337'
const URL_BACKEND_API = 'http://localhost:1337/api'

export async function getArticleById(id: number | string): Promise<GetOneArticuloResponse> {
  const res = await fetch(`${URL_BACKEND_API}/articulos/${id}?populate=*`)
  const data = await res.json()
  return data
}


interface OptGetAllArticles {
  size?: number,
  actualPage?: number,
  search?: string,
  order?: 'ASC' | 'DESC'
}

export const getAllArticles = async ({ size = 1, actualPage = 1, search = '', order = 'ASC' }: OptGetAllArticles) => {
  try {
    const entrySearch = search ? `&filters[nombre][$contains]=${search}&order=${order}` : ''
    const res = await fetch(`${URL_BACKEND_API}/articulos?pagination[page]=${actualPage}&pagination[pageSize]=${size}${entrySearch}&populate=*`)
    const data: GetArticuloResponse = await res.json()
    if (!res.ok) {
      return {
        code: 500,
        message: 'No se puede conectar con el servidor',
        data: null,
        meta: {}
      }
    }
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