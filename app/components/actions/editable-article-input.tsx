import { IconCross, IconEdit } from "@/lib/icons";
import ContentLabelWithText, { LabelStyle } from "../content-label-text";
import { Button, Input } from "../ui";
import { useState } from "react";
import { Form } from "@remix-run/react";
import { ACTIONS_ARTICLE } from "@/lib/routes";

export default function EditArticleInputAction({
  value = "",
  label = "",
  llave,
  size = "md",
}: {
  value?: any;
  label?: string;
  llave: string;
  size?: LabelStyle;
}) {
  const [active, setActive] = useState(false);
  return (
    <Form method="put" className={`group `}>
      <div className="flex items-center gap-4">
        <ContentLabelWithText title={label} description={value} size={size} />
        <button
          type="button"
          onClick={() => setActive(!active)}
          className={`rounded border p-2 opacity-0 group-hover:opacity-100 ${
            active && "!opacity-100"
          }`}
        >
          {active ? <IconCross className="text-destructive" /> : <IconEdit />}
        </button>
      </div>
      <div
        className={`mt-2.5 flex flex-col gap-1.5 p-1.5 pb-2.5 ${
          active ? "block" : "hidden"
        }`}
      >
        <input type="hidden" value={value} name="prev_value" />
        <input type="hidden" value={llave} name="llave" />
        <input type="hidden" value={ACTIONS_ARTICLE.EDIT} name="_action" />
        <Input
          placeholder="nuevo valor"
          name="new_value"
          id="new_value"
          className="bg-background"
        />
        <Button size="sm">Actualizar</Button>
      </div>
    </Form>
  );
}
