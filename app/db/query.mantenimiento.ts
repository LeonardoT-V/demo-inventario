import { fetcherToStrapi } from "@/lib/fetcher";
import { getUserData } from "@/services/user-cookie";
import { Mantenimiento, ReturnedMessage } from "@/types";


export async function registerNewMaintance(data, request: Request): Promise<ReturnedMessage> {
  const user = await getUserData(request);

  const res = await fetcherToStrapi<Mantenimiento>('/mantenimientos',
    { request, body: { encargado: user?.user?.id, ...data }, method: 'post' }
  )
  if (res.error) {
    return {
      message: 'Ha ocurrido un error',
      detail: res.error.message,
      type: 'error'
    }
  }
  return {
    message: 'Mantenimiento registrado',
    detail: 'Haz realizado un mantenimiento',
    type: 'success'
  }
}
