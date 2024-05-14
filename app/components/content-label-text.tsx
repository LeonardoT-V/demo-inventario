export default function ContentLabelWithText({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div>
      <h4 className="text-sm text-muted-foreground ">{title}</h4>
      <p className="text-lg font-light">{description}</p>
    </div>
  );
}
