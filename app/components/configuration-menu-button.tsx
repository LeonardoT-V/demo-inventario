import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuDoubleCheckboxItem,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import {
  IconConfig,
  IconLogout,
  IconMoon,
  IconSun,
  IconUniversity,
} from "@/lib/icons";
import { Theme, useTheme } from "remix-themes";
import { useNavigate } from "@remix-run/react";
import { ROUTES_DIRECTION } from "@/lib/routes";

function ConfigurationMenuButton() {
  const [theme, setTheme] = useTheme();
  const navigate = useNavigate();

  const toogleTheme = () => {
    return theme === "light" ? setTheme(Theme.DARK) : setTheme(Theme.LIGHT);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" className="h-fit w-full gap-2 text-xs ">
          <IconConfig className="size-3" />
          Configuración
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem
          onClick={() => navigate(ROUTES_DIRECTION["profile"].path)}
        >
          Tu perfil
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuDoubleCheckboxItem
          checked={theme === "dark"}
          onCheckedChange={toogleTheme}
          Icon={theme === "dark" ? IconSun : IconMoon}
        >
          Modo {theme === "dark" ? "claro" : "oscuro"}
        </DropdownMenuDoubleCheckboxItem>
        <DropdownMenuItem
          onClick={() => navigate(ROUTES_DIRECTION["select-place"].path)}
        >
          <span className="mr-2">
            <IconUniversity />
          </span>{" "}
          Cambiar carrera
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <form action="/logout" method="post">
          <button type="submit" className="w-full">
            <DropdownMenuItem>
              <span className="mr-2">
                <IconLogout />
              </span>{" "}
              Cerrar Sesion
            </DropdownMenuItem>
          </button>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ConfigurationMenuButton;
