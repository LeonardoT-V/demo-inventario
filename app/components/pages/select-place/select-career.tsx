import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { IconCareer } from "@/lib/icons";
import { CareerLocation, Facultad } from "@/types";

export default function SelectCareer({
  faculties = [],
  selection,
  setSelection,
}: {
  faculties: Facultad[];
  selection: CareerLocation;
  setSelection?: any;
}) {
  if (selection.faculty === undefined) {
    return (
      <p className="text-center text-muted-foreground">
        Seleccione una facultad para continuar
      </p>
    );
  }

  const facultad = faculties.find(
    (faculty) => faculty.nombre === selection.faculty?.nombre
  );

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {facultad?.carreras.map((career) => (
        <Card
          key={career.nombre}
          as="button"
          className="min-w-44 max-w-52 cursor-pointer transition hover:text-primary"
          asHover
          isActive={career.nombre === selection.career?.nombre}
          onClick={() => setSelection((state) => ({ ...state, career }))}
        >
          <CardHeader>
            <IconCareer className="mx-auto size-6" />
          </CardHeader>
          <CardContent>
            <h4 className="text-balance text-center text-sm">
              {career.nombre}
            </h4>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
