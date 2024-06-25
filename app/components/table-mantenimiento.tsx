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

export default function TableMantenimientos({
  mantenimientos,
}: {
  mantenimientos: Mantenimiento[];
}) {
  console.log(mantenimientos);

  return (
    <Table className="w-full ">
      <TableHeader>
        <TableRow>
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
