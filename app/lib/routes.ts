import { IconHome, IconArchive, IconPlusCircle, IconMove } from "./icons"
export const ROUTES = {
  inicio: { name: 'Inicio', path: '/', icon: IconHome },
  inventario: { name: 'Inventario', path: '/inventario', icon: IconArchive },
  "nuevo-registro": { name: 'Nuevo registro', path: '/nuevo-registro', icon: IconPlusCircle },
  "movimientos": { name: 'Movimientos', path: '/movimientos', icon: IconMove }
}

export const ROUTES_DIRECTION = {
  ...ROUTES,
  'select-place': {
    name: 'Seleccionar lugar', path: '/select-place'
  }
}