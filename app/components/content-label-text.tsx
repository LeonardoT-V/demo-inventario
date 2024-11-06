import type { ComponentProps } from "react";

const labelStyle = {
  md: { title: "text-sm", text: "text-lg" },
  sm: { title: "text-xs", text: "text-base" },
  xl: { title: "text-xl", text: "text-xl" },
  "4xl": { title: "text-4xl", text: "text-4xl" },
};

export type LabelStyle = keyof typeof labelStyle;

interface ContentLabelWithTextProps extends ComponentProps<"div"> {
  title: string;
  description?: string;
  size?: keyof typeof labelStyle;
}

export default function ContentLabelWithText({
  title,
  description = "",
  size = "md",
  ...props
}: ContentLabelWithTextProps) {
  return (
    <div {...props}>
      <h4 className={`${labelStyle[size].title} text-muted-foreground/70`}>
        {title}
      </h4>
      <p className={`${labelStyle[size].text} text-foreground/90`}>
        {description}
      </p>
    </div>
  );
}
