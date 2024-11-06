import { ROUTES } from "@/lib/routes";
import { Button, NavLink } from "../ui";
import { IconLogout } from "@/lib/icons";
import ConfigurationMenuButton from "../configuration-menu-button";
import { ComponentPropsWithoutRef } from "react";
import { Link, useLocation } from "@remix-run/react";
import { CareerLocation } from "@/types";

interface WithNavLayoutProps extends ComponentPropsWithoutRef<"aside"> {
  careerLocation: undefined | CareerLocation;
}

function WithNavLayout({ careerLocation, ...props }: WithNavLayoutProps) {
  const routes = Object.values(ROUTES);
  const location = useLocation();
  if (location.pathname === "/login" || location.pathname === "/select-place") {
    return <>{props.children}</>;
  }
  return (
    <>
      <aside
        className="flex h-full w-64 flex-none flex-col gap-6 border-r bg-card p-4"
        {...props}
      >
        <header>
          <Link to={ROUTES.inicio.path}>
            <img
              src="/LOGO-ULEAM-HORIZONTAL.png"
              alt="logo de ULEAM(universidad laica eloy alfaro de manabí)"
              className="aspect-video h-14 w-44"
            />
          </Link>
        </header>

        <nav className="flex flex-1 flex-col gap-y-3">
          {routes.map((route) => (
            <NavLink
              key={route.name}
              to={route.path}
              name={route.name}
              Icon={route.icon}
            />
          ))}
        </nav>
        <footer className="flex flex-col gap-2">
          <div className="flex rounded-md border bg-background px-4 py-2.5">
            <div className="grow space-y-2">
              <h5 className="text-balance text-sm font-medium text-primary">
                {careerLocation?.faculty?.nombre}
              </h5>
              <h5 className="text-balance text-xs font-medium text-muted-foreground">
                {careerLocation?.career?.nombre}
              </h5>
            </div>
            {/* <Button variant="secondary" className="h-fit p-2">
              <IconLogout className="size-3 " />
            </Button> */}
          </div>
          <ConfigurationMenuButton />
        </footer>
      </aside>
      <main className="flex-1 space-y-8 overflow-auto py-4 pr-8">
        {props.children}
      </main>
    </>
  );
}

export default WithNavLayout;
