import { getUserData } from "@/services/user-cookie"
import { ErrorResponse } from "@/types";

const STRAPI_URL_API = "http://localhost:1337/api"
interface FetcherStrapiProps extends RequestInit { request: Request; body?: any; }
export async function fetcherToStrapi<T>(url: string, { request, body, method = 'GET', ...props }: FetcherStrapiProps): Promise<T & ErrorResponse> {
  const URL_BACKEND_API = STRAPI_URL_API
  const user = await getUserData(request)
  const headers = {
    'Authorization': `Bearer ${user?.jwt}`,
    "Content-Type": "application/json",
  }
  const sendBody = body && JSON.stringify({ data: { ...body } })

  const response = await fetch(`${URL_BACKEND_API}${url}`, {
    headers,
    body: sendBody,
    method,
    ...props
  })
  const fetchData = await response.json()
  return fetchData
}