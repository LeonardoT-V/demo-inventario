import { IconZoom } from "@/lib/icons";
import { Input, Button } from "../ui";

export default function InputSearchInventory() {
  return (
    <form className="inline-flex">
      <Input
        placeholder="Nombre del articulo"
        className="w-96 rounded-r-none focus-visible:border-primary focus-visible:ring-0"
        name="search"
      />
      <Button className="rounded-l-none">
        <IconZoom className="mr-1.5" /> Buscar
      </Button>
    </form>
  );
}
