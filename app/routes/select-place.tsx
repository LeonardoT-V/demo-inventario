import SelectCareer from "@/components/pages/select-place/select-career";
import SectionWithHeader from "@/components/section-header";
import { Button } from "@/components/ui";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { getAllFaculty } from "@/db/query.facultad";
import { IconUniversity } from "@/lib/icons";
import { ROUTES_DIRECTION } from "@/lib/routes";
import { createCareerLocationSession } from "@/services/career-cookie.server";
import { CareerLocation } from "@/types";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json, useLoaderData, Form } from "@remix-run/react";
import { useState } from "react";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return json({ faculties: await getAllFaculty(request) });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const { data } = Object.fromEntries(await request.formData());
  const form: CareerLocation = await JSON.parse(data.toString());
  console.log(form);
  return createCareerLocationSession(
    { career: form.career, faculty: form.faculty },
    ROUTES_DIRECTION["inicio"].path
  );
};

export default function SelectPlace() {
  const { faculties } = useLoaderData<typeof loader>();
  const [seletion, setSelection] = useState<CareerLocation>({
    faculty: undefined,
    career: undefined,
  });

  return (
    <SectionWithHeader
      title="Seleccione Facultad y Carrera"
      position="center"
      className="container mt-20 "
    >
      <section className="mt-20 flex flex-col gap-y-14">
        <aside className="w-full space-y-4">
          <h3 className="text-center text-2xl font-medium">
            Facultades disponibles
          </h3>

          <div className="flex flex-wrap justify-center gap-4">
            {faculties.map((faculty) => (
              <Card
                key={faculty.nombre}
                as="button"
                className="min-w-44 max-w-52 cursor-pointer transition hover:text-primary"
                asHover
                isActive={faculty.nombre === seletion.faculty?.nombre}
                onClick={() =>
                  setSelection({ career: undefined, faculty: faculty })
                }
              >
                <CardHeader>
                  <IconUniversity className="mx-auto size-10" weight="light" />
                </CardHeader>
                <CardContent>
                  <h4 className="text-balance text-center text-sm">
                    {faculty.nombre}
                  </h4>
                </CardContent>
              </Card>
            ))}
          </div>
        </aside>
        <aside className="w-full space-y-4">
          <h3 className="text-center text-2xl font-medium">
            Carreras seleccionables
          </h3>
          <SelectCareer
            selection={seletion}
            setSelection={setSelection}
            faculties={faculties}
          />
        </aside>
        <Form method="POST" className="mx-auto">
          <input name="data" type="hidden" value={JSON.stringify(seletion)} />
          <Button
            disabled={
              seletion.career === undefined || seletion.faculty === undefined
            }
            className="w-96"
          >
            Acceder
          </Button>
        </Form>
      </section>
    </SectionWithHeader>
  );
}
