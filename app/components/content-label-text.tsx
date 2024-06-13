const labelStyle = {
  md: { title: "text-sm", text: "text-lg" },
  sm: { title: "text-xs", text: "text-base" },
};

export default function ContentLabelWithText({
  title,
  description = "",
  size = "md",
}: {
  title: string;
  description?: string;
  size?: "sm" | "md";
}) {
  return (
    <div>
      <h4 className={`${labelStyle[size].title} text-muted-foreground/70`}>
        {title}
      </h4>
      <p className={`${labelStyle[size].text} text-lg text-foreground/90`}>
        {description}
      </p>
    </div>
  );
}
