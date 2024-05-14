import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuDoubleCheckboxItem,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { IconConfig, IconMoon, IconSun } from "@/lib/icons";
import { Theme, useTheme } from "remix-themes";

function ConfigurationMenuButton() {
  const [theme, setTheme] = useTheme();

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
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuItem>Perfil</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem>Billing</DropdownMenuItem>
        <DropdownMenuItem>Team</DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuDoubleCheckboxItem
          checked={theme === "dark"}
          onCheckedChange={toogleTheme}
          Icon={theme === "dark" ? IconSun : IconMoon}
        >
          modo {theme === "dark" ? "claro" : "oscuro"}
        </DropdownMenuDoubleCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default ConfigurationMenuButton;
