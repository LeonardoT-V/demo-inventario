import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui";
import { IconEye } from "@/lib/icons";
import { Mantenimiento } from "@/types";
import { FormatToDateIntl } from "@/lib/date";
import ContentLabelWithText from "./content-label-text";

export default function ModalMantenimientoInfo({
  mantenimiento,
}: {
  mantenimiento: Mantenimiento;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" icon={<IconEye />}></Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-8">Informe del mantenimiento</DialogTitle>
          <DialogDescription className="space-y-6">
            <ContentLabelWithText
              size="sm"
              title="Tipo de mantenimiento:"
              description={mantenimiento.tipo}
            />
            <div className="flex gap-x-8 gap-y-4">
              <ContentLabelWithText
                size="sm"
                title="Realizado por:"
                description={mantenimiento.encargado?.email}
              />
              <ContentLabelWithText
                size="sm"
                title="El día:"
                description={FormatToDateIntl(mantenimiento.createdAt)}
              />
            </div>
            <ContentLabelWithText
              size="sm"
              title="Detalle del mantenimiento:"
              description={mantenimiento.detalle}
            />
            <ContentLabelWithText
              size="sm"
              title="Comentario:"
              description={mantenimiento.comentario}
            />
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4">
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Cancelar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
