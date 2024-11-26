import { Button } from "./ui";
import { IconArchive, IconHome, IconImage } from "@/lib/icons";
import { Form } from "@remix-run/react";
import { CareerLocation } from "@/types";
import InputLabel from "@/components/input-label";

export default function FormRegisterElement({
  location,
}: {
  location: CareerLocation;
}) {
  return (
    <Form
      encType="multipart/form-data"
      action="/nuevo-registro"
      method="post"
      className="grid grid-cols-2 gap-2.5 gap-x-8"
    >
      <section className="row-span-2 h-full">
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
          <InputLabel label="image" placeholder="Ingrese la imagen" type="file" accept="image/*"/>
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
      <Button size="lg" type="submit" className="col-span-2 mx-auto w-96">
        Agregar registro
      </Button>
    </Form>
  );
}
