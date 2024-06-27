import { IconCross, IconEdit } from "@/lib/icons";
import ContentLabelWithText from "../content-label-text";
import { Button, Input } from "../ui";
import { useState } from "react";
import { Form } from "@remix-run/react";
import { ACTIONS_ARTICLE } from "@/lib/routes";

export default function EditArticleInputAction({
  value = "",
  label = "",
  key,
}: {
  value?: any;
  label?: string;
  key: string;
}) {
  const [active, setActive] = useState(false);
  return (
    <Form method="put">
      <div className="group flex items-center gap-4 px-1.5 hover:bg-card">
        <ContentLabelWithText
          className="grow"
          title={label}
          description={value}
        />
        <button
          type="button"
          onClick={() => setActive(!active)}
          className={`rounded border p-2 opacity-0 group-hover:opacity-100 ${
            active && "!opacity-100"
          }`}
        >
          {active ? <IconCross /> : <IconEdit />}
        </button>
      </div>
      <div
        className={`mt-2.5 flex flex-col gap-1.5 ${
          active ? "block" : "hidden"
        }`}
      >
        <input type="hidden" value={value} name="prev_value" />
        <input type="hidden" value={key} name="llave" />
        <input type="hidden" value={ACTIONS_ARTICLE.EDIT} name="_action" />
        <Input placeholder="nuevo valor" name="new_value" id="new_value" />
        <Button size="sm">Actualizar</Button>
      </div>
    </Form>
  );
}
