const URL_BACKEND_API = process.env.STRAPI_URL_API

export async function createNewArticleEntry(data, jwt) {
  // TODO: implementar el fetcher
  const res = await fetch(`${URL_BACKEND_API}/articulos/`, {
    method: 'POST',
    body: JSON.stringify({ data }),
    headers: {
      'Authorization': `Bearer ${jwt}`,
      "Content-Type": "application/json",
    }
  })
  const entryRegistred = await res.json()
  return entryRegistred
}