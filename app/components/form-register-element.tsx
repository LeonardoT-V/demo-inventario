import { Button } from "./ui";
import { IconHome, IconImage, IconArchive } from "@/lib/icons";
import { Form, useNavigation } from "@remix-run/react";
import { CareerLocation } from "@/types";
import InputLabel from "@/components/input-label";
import SearchDocente from "./search-docente";

export default function FormRegisterElement({
  location,
  strapi_url,
}: {
  location: CareerLocation;
  strapi_url: string;
}) {
  const navigation = useNavigation();
  const isSubmitting = navigation.formAction === "/nuevo-registro";
  return (
    <Form
      encType="multipart/form-data"
      action="/nuevo-registro"
      method="post"
      className="grid grid-cols-2 gap-8"
    >
      <section className="row-span-3 h-full">
        <h5 className="inline-flex items-center text-sm font-medium text-primary">
          <IconArchive className="mr-1.5 size-4 " /> Detalles del articulo
        </h5>
        <div className="space-y-2 ">
          <InputLabel
            isRequired
            label="nombre"
            placeholder="Nombre del articulo"
          />

          <InputLabel
            label="descripcion"
            placeholder="Descripción del articulo"
            isTextArea
          />
          <InputLabel
            isRequired
            label="condicion"
            placeholder="Descripción del articulo"
          />
          <InputLabel
            isRequired
            label="aula"
            placeholder="Ubicacion del aula"
          />
        </div>
      </section>
      <section>
        <h5 className="inline-flex items-center text-sm font-medium text-primary">
          <IconImage className="mr-1.5 size-4" /> Fotografía
        </h5>
        <div className="space-y-2 ">
          <InputLabel
            label="image"
            placeholder="Ingrese la imagen"
            type="file"
            accept="image/*"
          />
        </div>
      </section>
      <section>
        <h5 className="inline-flex items-center text-sm font-medium text-primary">
          <IconImage className="mr-1.5 size-4" /> Asignación
        </h5>
        <div className="space-y-2 ">
          <SearchDocente strapi_url={strapi_url} />
        </div>
      </section>
      <section>
        <h5 className="inline-flex items-center text-sm font-medium text-primary">
          <IconHome className="mr-1.5 size-4" /> Ubicación
        </h5>
        <div className="space-y-2 ">
          <InputLabel
            label="facultad"
            placeholder="facultad"
            value={location.faculty?.nombre}
            className="!cursor-default border-none"
            disabled
          />
          <InputLabel
            label="carrera"
            placeholder="Ingrese URL de imagen"
            value={location.career?.nombre}
            className="!cursor-default border-none"
            disabled
          />
        </div>
      </section>
      <Button
        size="lg"
        disabled={isSubmitting}
        type="submit"
        className="col-span-2 mx-auto w-96"
      >
        {isSubmitting ? "Registrando..." : "Agregar registro"}
      </Button>
    </Form>
  );
}
