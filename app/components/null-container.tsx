export default function NullContainer({
  title,
  description,
  icon,
}: {
  title: string;
  description: string;
  icon: any;
}) {
  const Icon = icon;
  return (
    <div className="col-span-full mt-8 flex w-full flex-col items-center justify-center gap-2">
      <Icon className="size-16" />
      <h3 className="text-3xl text-primary">{title}</h3>
      <p className="text-xs text-muted-foreground">{description}</p>
    </div>
  );
}
