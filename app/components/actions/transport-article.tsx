import { IconLocation, IconUniversity } from "@/lib/icons";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button, Label } from "../ui";
import { Form } from "@remix-run/react";
import { ACTIONS_ARTICLE } from "@/lib/routes";
import { TIPO_EDIT_ARTICLE } from "@/lib/const";
import { Articulo, Facultad } from "@/types";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import InputLabel from "../input-label";

export default function TransportArticleAction({
  articulo,
  facultades,
}: {
  articulo: Articulo;
  facultades: Facultad[];
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" icon={<IconLocation className="mr-1.5" />}>
          Reubicar
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Form method="put">
          <DialogHeader>
            <DialogTitle>Reubicar articulo</DialogTitle>
            <DialogDescription>
              <p>
                Al confirmar esta acción el articulo sera transferido hacia otra
                facultad, cuando confirme esta selección no volvera a ver este
                articulo.
              </p>
              <p>Llene los campos necesarios para transferir el articulo</p>
            </DialogDescription>
            <input name="tipo_register" value={TIPO_EDIT_ARTICLE.MOVE} hidden />
            <input name="prev_value" value={articulo.carrera.nombre} hidden />
            <input name="llave" value="carrera" hidden />
            <div>
              <Label label="carrera" isRequired />
              <Select name="carrera" required>
                <SelectTrigger id="carrera">
                  <SelectValue
                    placeholder="Seleccionar una carrera"
                    id="new_value"
                  />
                </SelectTrigger>
                <SelectContent>
                  {facultades.map((facultad) => (
                    <SelectGroup key={facultad.id}>
                      <SelectLabel>
                        <span className="inline-flex align-middle">
                          <IconUniversity />
                        </span>
                        <span className="ml-2">{facultad.nombre}</span>
                      </SelectLabel>
                      {facultad.carreras.map((carrera) => (
                        <SelectItem
                          value={carrera.id.toString()}
                          key={carrera.id}
                        >
                          {carrera.nombre}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <InputLabel
              isRequired
              label="aula"
              placeholder="Administración, aula 201, etc."
            />
          </DialogHeader>
          <DialogFooter className="my-4">
            <p className="text-pretty text-right text-sm text-muted-foreground">
              Al confimar la transferencia ya no podra observar el articulo en
              esta facultad.
            </p>
          </DialogFooter>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                asd Cancelar
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                type="submit"
                variant="default"
                name="_action"
                value={ACTIONS_ARTICLE.MOVE}
              >
                Transferir
              </Button>
            </DialogClose>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
