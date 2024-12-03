import { useState } from "react";
import { ComboBox } from "./ui/combobox";
import { useDebouncedCallback } from "use-debounce";

export default function SearchDocente({ strapi_url }: { strapi_url: string }) {
  const [user, setUser] = useState([]);
  const debounced = useDebouncedCallback(async (value) => {
    const userFetch = await fetch(
      `${strapi_url}/users?filters[$or][0][nombres][$containsi]=${value}&filters[$or][1][apellidos][$containsi]=${value}&filters[$or][2][cedula][$containsi]=${value}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const userFiltered = await userFetch.json();
    const data = userFiltered.map((item: any) => {
      return {
        value: item.id,
        label: `${item.nombres} ${item.apellidos}`,
      };
    });
    setUser(data);
  }, 1000);

  return (
    <ComboBox
      placeholder="Buscar docente"
      label="responsable"
      isRequired
      data={user}
      onChange={debounced}
    />
  );
}
