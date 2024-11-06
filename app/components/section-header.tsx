import type { ComponentPropsWithoutRef } from "react";

interface SectionWithHeaderProps extends ComponentPropsWithoutRef<"section"> {
  title?: string;
  position?: "default" | "center";
}

function SectionWithHeader({
  title,
  position = "default",
  ...props
}: SectionWithHeaderProps) {
  return (
    <section className="flex flex-col gap-2.5" {...props}>
      <header className="flex items-center gap-4">
        {position === "center" && <hr className="grow" />}
        {title && (
          <>
            <h3 className="text-3xl font-thin text-muted-foreground/70">
              {title}
            </h3>
            <hr className="grow" />
          </>
        )}
      </header>
      {props.children}
    </section>
  );
}

export default SectionWithHeader;
