import { FormatToDateWithHour } from "@/lib/date";
import { IconArrowRight } from "@/lib/icons";
import { Cambio } from "@/types";

export default function TextChangedArticle({ changes }: { changes: Cambio }) {
  if (changes.tipo === "disable") {
    return (
      <div className="flex flex-wrap items-center gap-1 border-b py-2 pb-4 text-sm last-of-type:border-0">
        <p className="mr-1.5 text-xs text-muted-foreground">
          [ {FormatToDateWithHour(changes.createdAt)} ]
        </p>
        <p className="font-medium text-destructive">
          {changes.responsable.email}
        </p>
        <p className="text-destructive">ha deshabilitado el articulo</p>
      </div>
    );
  }
  if (changes.tipo === "active") {
    return (
      <div className="flex flex-wrap items-center gap-1 border-b py-2 pb-4 text-sm last-of-type:border-0">
        <p className="mr-1.5 text-xs text-muted-foreground">
          [ {FormatToDateWithHour(changes.createdAt)} ]
        </p>
        <p className="font-medium text-emerald-500">
          {changes.responsable.email}
        </p>
        <p className="text-emerald-500"> rehabilitado el articulo</p>
      </div>
    );
  }

  if (changes.tipo === "edit") {
    return (
      <div className="flex flex-wrap items-center gap-1 border-b py-2 pb-4 text-sm last-of-type:border-0">
        <p className="mr-1.5 text-xs text-muted-foreground">
          [ {FormatToDateWithHour(changes.createdAt)} ]
        </p>
        <p className="font-medium ">{changes.responsable.email}</p>
        <p className="">
          actualizó el valor de{" "}
          <span className="font-medium">{changes.llave}</span> [
          {changes.prev_value}
          <span className="mx-2 inline-flex align-middle">
            <IconArrowRight />
          </span>
          {changes.new_value} ]
        </p>
      </div>
    );
  }
  if (changes.tipo === "move") {
    return (
      <div className="flex flex-wrap items-center gap-1 border-b py-2 pb-4 text-sm last-of-type:border-0">
        <p className="mr-1.5 text-xs text-muted-foreground">
          [ {FormatToDateWithHour(changes.createdAt)} ]
        </p>
        <p className="font-medium ">{changes.responsable.email}</p>
        <p className="">
          actualizó el valor de{" "}
          <span className="font-medium">{changes.llave}</span> [
          {changes.prev_value}
          <span className="mx-2 inline-flex align-middle">
            <IconArrowRight />
          </span>
          {changes.new_value} ]
        </p>
      </div>
    );
  }
}
