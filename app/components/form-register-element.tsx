import { Button, Input, Label } from "./ui";
import { IconArchive, IconHome, IconImage } from "@/lib/icons";
import { Form } from "@remix-run/react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export default function FormRegisterElement() {
  return (
    <Form
      action="/nuevo-registro"
      method="post"
      className="grid grid-cols-2 gap-2.5"
    >
      <section className="rounded-lg border bg-background p-3 transition-all group-hover:bg-primary/5">
        <h5 className="inline-flex items-center text-sm font-medium text-primary">
          <IconArchive className="mr-1.5 size-4 " /> Datos del articulo
        </h5>
        <div className="space-y-2">
          <div className="col-span-2 w-full space-y-0.5">
            <Label htmlFor="object" className="text-xs">
              Nombre
            </Label>
            <Input
              id="nombre"
              name="nombre"
              placeholder="Nombre del articulo"
            />
          </div>
          <div className="col-span-2 w-full space-y-0.5">
            <Label htmlFor="descripcion" className="text-xs">
              Descripción <span className="text-destructive">*</span>
            </Label>
            <Input
              id="descripcion"
              name="descripcion"
              placeholder="Detalle del articulo"
            />
          </div>
          <div className="col-span-2 w-full space-y-0.5">
            <Label htmlFor="condicion" className="text-xs">
              Condición <span className="text-destructive">*</span>
            </Label>
            <Input
              id="condicion"
              name="condicion"
              placeholder="Pc componente"
            />
          </div>
        </div>
      </section>
      <section className="rounded-lg border bg-background p-3 transition-all group-hover:bg-primary/5">
        <h5 className="inline-flex items-center text-sm font-medium text-primary">
          <IconHome className="mr-1.5 size-4" /> Ubicación
        </h5>
        <div className="space-y-2">
          <div className="col-span-2 w-full space-y-0.5">
            <Label htmlFor="facultad" className="text-xs">
              Facultad
            </Label>
            {/* <Input id="facultad" name="facultad" placeholder="Pc componente" /> */}
            <Select name="facultad">
              <SelectTrigger className="placeholder:text-red-400">
                <SelectValue
                  placeholder="Seleccione una facultad"
                  className="placeholder:text-red-400"
                />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="apple">Apple</SelectItem>
                  <SelectItem value="banana">Banana</SelectItem>
                  <SelectItem value="blueberry">Blueberry</SelectItem>
                  <SelectItem value="grapes">Grapes</SelectItem>
                  <SelectItem value="pineapple">Pineapple</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="col-span-2 w-full space-y-0.5">
            <Label htmlFor="carrera" className="text-xs">
              Carrera <span className="text-destructive">*</span>
            </Label>
            <Input id="carrera" name="carrera" placeholder="Pc componente" />
          </div>
          <div className="col-span-2 w-full space-y-0.5">
            <Label htmlFor="aula" className="text-xs">
              Aula
            </Label>
            <Input id="aula" name="aula" placeholder="Pc componente" />
          </div>
        </div>
      </section>
      <section className="rounded-lg border bg-background p-3 transition-all group-hover:bg-primary/5">
        <h5 className="inline-flex items-center text-sm font-medium text-primary">
          <IconImage className="mr-1.5 size-4" /> Imagen
        </h5>
        <div className="space-y-2">
          <div className="col-span-2 w-full space-y-0.5">
            <Label htmlFor="image" className="text-xs">
              Url de la imagen
            </Label>
            <Input
              id="image"
              name="image"
              type="url"
              placeholder="https://imagen.com/imagen.jpg"
            />
          </div>
          <img
            src="com.jpg"
            className="mx-auto aspect-square w-full rounded-lg object-cover object-center md:size-64"
            alt="previsualización del articulo a ingresar"
          />
        </div>
      </section>
      <div className="space-y-2">
        <Button size="lg" type="submit" className="w-full">
          Agregar registro
        </Button>
        <p className="text-xs text-muted-foreground">
          Los campos con un{" "}
          <span className="font-medium text-destructive">*</span> son necesarios
        </p>
      </div>
    </Form>
  );
}
