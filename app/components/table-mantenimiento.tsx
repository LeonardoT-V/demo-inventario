import { Mantenimiento } from "@/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { FormatToDateSmall } from "@/lib/date";
import ModalMantenimientoInfo from "./modal-matenimiento-info";
import { Badge } from "./ui";
import { Card } from "./ui/card";
import { IconMaintance } from "@/lib/icons";

export default function TableMantenimientos({
  mantenimientos = [],
}: {
  mantenimientos: Mantenimiento[];
}) {
  if (mantenimientos.length === 0 || !mantenimientos) {
    return (
      <Card className="flex flex-col items-center gap-4 p-8 py-16">
        <p className="inline-flex items-center gap-1.5 text-lg text-muted-foreground 2xl:text-2xl">
          <IconMaintance />
          <span>No existen mantenimientos</span>
        </p>
      </Card>
    );
  }

  return (
    <Table className="w-full ">
      <TableHeader>
        <TableRow className="bg-card">
          <TableHead className="w-[100px]">Registado</TableHead>
          <TableHead>Realizado por</TableHead>
          <TableHead className="w-full">Detalle</TableHead>
          <TableHead className="w-full">Tipo</TableHead>
          <TableHead className="text-center">Ver</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {mantenimientos.map((mantenimiento) => (
          <TableRow key={mantenimiento.id}>
            <TableCell className="font-medium">
              {FormatToDateSmall(mantenimiento.createdAt)}
            </TableCell>
            <TableCell>{mantenimiento.encargado?.email}</TableCell>
            <TableCell>{mantenimiento.detalle}</TableCell>
            <TableCell>
              <Badge variant="outline">{mantenimiento.tipo}</Badge>
            </TableCell>
            <TableCell className="text-right">
              <ModalMantenimientoInfo mantenimiento={mantenimiento} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
