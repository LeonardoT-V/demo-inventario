import { IconHome, IconArchive, IconPlusCircle } from "./icons";
export const ROUTES = {
  inicio: { name: "Inicio", path: "/", icon: IconHome },
  inventario: { name: "Inventario", path: "/inventario", icon: IconArchive },
  "nuevo-registro": {
    name: "Nuevo registro",
    path: "/nuevo-registro",
    icon: IconPlusCircle,
  },
};

export const ROUTES_DIRECTION = {
  ...ROUTES,
  "select-place": {
    name: "Seleccionar lugar",
    path: "/select-place",
  },
  login: {
    name: "Iniciar Sesion",
    path: "/login",
  },
  profile: {
    name: "Perfil",
    path: "/profile",
  },
};

export const ACTIONS_MAINTANCE = {
  REGISTER: "create-maintance",
};

export const ACTIONS_ARTICLE = {
  DISABLE: "disable-article",
  ACTIVE: "active-article",
  EDIT: "edit-article",
  MOVE: "move-article",
  EDIT_IMAGE: "edit-image",
};
