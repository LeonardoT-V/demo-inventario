import { IconPlus, IconPlusCircle } from "@/lib/icons";
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
import { Button } from "../ui";
import { Form } from "@remix-run/react";
import { ACTIONS_MAINTANCE } from "@/lib/routes";

import InputLabel from "../input-label";

export default function CreateMaintanceAction() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" icon={<IconPlus className="mr-1.5" />}>
          Mantenimiento
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Form method="post">
          <DialogHeader>
            <DialogTitle>Registra un nuevo mantenimiento</DialogTitle>
            <DialogDescription>
              LLena los siguientes campos para realizar un mantenimiento a este
              articulo.
            </DialogDescription>
          </DialogHeader>
          <section className="my-6 flex flex-col gap-2">
            <InputLabel
              label="tipo"
              placeholder="Preventivo, Correctivo, etc"
              isRequired
            />
            <InputLabel
              label="detalle"
              placeholder="Detalles del mantenimiento"
              isTextArea
              isRequired
            />
            <InputLabel
              label="comentario"
              placeholder="Realize una observacion o comentario"
              description="Este campo es opcional"
              isTextArea
            />
          </section>
          <DialogFooter>
            <DialogClose asChild>
              <Button type="button" variant="secondary">
                Cancelar
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                type="submit"
                variant="default"
                name="_action"
                value={ACTIONS_MAINTANCE.REGISTER}
                icon={<IconPlusCircle className="mr-1.5" />}
              >
                Agregar registro
              </Button>
            </DialogClose>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
