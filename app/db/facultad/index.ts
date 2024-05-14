// import { Facultad } from "@/types"

import { Facultad } from "@/types"

const URL_BACKEND_API = 'http://localhost:1337/api'

export const getAllFaculty = async (): Promise<Facultad[]> => {
  const res = await fetch(`${URL_BACKEND_API}/facultades?populate=*`)
  const { data } = await res.json()

  return data
}

// export const filterCareersByFaculty = async (faculties: any[],{where}:{where:string}) => {

//   return
// }