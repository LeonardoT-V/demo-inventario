import { IconImage } from "@/lib/icons";
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

export default function ReplaceImageAction({ imageId
}: { imageId: any;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary" icon={<IconImage className="mr-1.5" />}>
          Editar Imagen
        </Button>
      </DialogTrigger>
      <DialogContent>

        <Form method="put" encType="multipart/form-data">
          <DialogHeader>
            <DialogTitle>Editar imagen</DialogTitle>
            <DialogDescription>
              <p>
                Seleccione una nueva imagen para el siguiente articulo.
              </p>
            </DialogDescription>

            <input type="text" name="id_image" value={imageId} hidden />

            <InputLabel
              accept="image/*"
              isRequired
              type="file"
              label="Nueva imagen"
              id="new_image"
            />
          </DialogHeader>

          <DialogFooter className="mt-6">
            <DialogClose asChild>
              <Button type="button" variant="destructive">
                Cancelar
              </Button>
            </DialogClose>
            <DialogClose asChild>
              <Button
                type="submit"
                variant="default"
                name="_action"
                value={ACTIONS_ARTICLE.EDIT_IMAGE}
              >
                Cambiar imagen
              </Button>
            </DialogClose>
          </DialogFooter>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
