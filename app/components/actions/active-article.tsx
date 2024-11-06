import { IconCross } from "@/lib/icons";
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
import { ACTIONS_ARTICLE } from "@/lib/routes";
import InputLabel from "../input-label";
import { TIPO_EDIT_ARTICLE } from "@/lib/const";

export default function ActiveArticleAction() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" icon={<IconCross className="mr-1.5" />}>
          Habilitar
        </Button>
      </DialogTrigger>
      <DialogContent>
        <Form method="put">
          <DialogHeader>
            <DialogTitle>Habilitar articulo</DialogTitle>
            <DialogDescription>
              Vas a habilitar el articulo **** de la lista de articulos activos.{" "}
              <br />
              De clic en el boton de{" "}
              <span className="font-medium text-primary">Habilitar</span> para
              confirmar esta acción.
            </DialogDescription>
            <input
              name="tipo_register"
              value={TIPO_EDIT_ARTICLE.ACTIVE}
              hidden
            />
            <InputLabel
              isTextArea
              label="comentario"
              placeholder="Ingrese un comentario (Opcional)"
            />
            <input name="prev_value" value="false" hidden />
            <input name="llave" value="habilitado" hidden />
          </DialogHeader>
          <DialogFooter className="mt-8">
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
                value={ACTIONS_ARTICLE.ACTIVE}
              >
                Habilitar
              </Button>
            </DialogClose>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
