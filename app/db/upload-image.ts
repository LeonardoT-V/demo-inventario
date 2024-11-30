export async function uploadImage(image: any, jwt: string) {
  const baseUrl = process.env.STRAPI_URL_API;
  const path = "/upload";

  const url = baseUrl + path;
  const formData = new FormData();

  formData.append("files", image, image.name);

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
    body: formData,
  });

  const dataResponse = await response.json();
  return dataResponse;
}

export async function deleteImage(id: any, jwt: any) {
  const baseUrl = process.env.STRAPI_URL_API;
  const path = "/upload/files/" + id;
  const url = baseUrl + path;

  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${jwt}`,
    },
  });
  const dataResponse = await response.json();
  return dataResponse;
}
