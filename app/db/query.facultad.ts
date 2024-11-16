import { fetcherToStrapi } from "@/lib/fetcher"
import { Facultad } from "@/types"

export const getAllFaculty = async (request: Request) => {
  const res = await fetcherToStrapi('/facultades?populate=*', { request })
  if (res.error) {
    return []
  }
  return res.data as Facultad[]
}