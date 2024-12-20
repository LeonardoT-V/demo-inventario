import paginationUtil from "@/lib/pagination";
import { TIPO_EDIT_ARTICLE } from "@/lib/const";

export interface GetArticuloResponse {
  data: Articulo[];
  meta: Meta;
}

export interface ErrorMsg {
  status: string;
  name: string;
  message: string;
  details: Error;
}

export interface GetOneArticuloResponse {
  data: Articulo;
  meta: Meta;
  error: ErrorMsg;
}

export interface Articulo extends StrapiDefaultResponse {
  id: number;
  nombre: string;
  descripcion: string;
  ubicacion: string;
  habilitado: boolean;
  condicion: string;
  url_img: string;
  aula: string;
  registros: Registro[];
  registrado: Profile;
  carrera: Carrera;
  mantenimientos: Mantenimiento[];
  responsable: Profile;
  cambios: Cambio[];
  image: Image;
}

export interface Image extends StrapiDefaultResponse {
  id: number;
  name: string;
  alternativeText: null;
  caption: null;
  width: number;
  height: number;
  formats: {
    thumbnail: {
      ext: string;
      url: string;
      hash: string;
      mime: string;
      name: string;
      path: null;
      size: number;
      width: number;
      height: number;
      sizeInBytes: number;
    };
  };
  hash: string;
  ext: string;
  mime: string;
  size: number;
  url: string;
}

export interface Mantenimiento extends StrapiDefaultResponse {
  tipo: string;
  comentario?: string;
  encargado: Profile;
  detalle: string;
  articulo: Articulo;
}

export interface Registro extends StrapiDefaultResponse {
  id: number;
  detalle: string;
  articulo: Articulo;
  carrera: Carrera;
  tipo_movimiento: TipoMovimiento;
  user: User;
}
export interface User extends StrapiDefaultResponse {
  id: number;
  username: string;
  email: Articulo;
}

export interface Carrera extends StrapiDefaultResponse {
  id: number;
  nombre: string;
  descripcion: string;
  habilitado: boolean;
  facultad: Facultad;
}

export interface Cambio extends StrapiDefaultResponse {
  id: number;
  responsable: Profile;
  tipo: TipoCambio;
  articulo: Articulo;
  comentario: string;
  prev_value?: string;
  new_value?: string;
  prev_carrera?: string;
  llave: string;
}

export type TipoCambioKey = keyof typeof TIPO_EDIT_ARTICLE;
export type TipoCambio = (typeof TIPO_EDIT_ARTICLE)[TipoCambioKey];

export interface Facultad extends StrapiDefaultResponse {
  id: number;
  nombre: string;
  edifico: string;
  descripcion: string;
  habilitado: boolean;
  carreras: Carrera[];
}

export interface TipoMovimiento extends StrapiDefaultResponse {
  id: number;
  nombre: string;
  registros: Registro[];
}
export interface StrapiDefaultResponse {
  id: number;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  createdBy: string;
}

export interface Meta {
  pagination: MetaPagination;
}

export interface MetaPagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}
export interface Pagination {
  next?: number;
  prev?: number;
  total?: number;
  isFirt?: boolean;
  isLast?: boolean;
  actualPage?: number;
  itemPerPage?: number;
}

export type ParamsPagination = ReturnType<typeof paginationUtil>;

export type LoginResponse = ErrorResponse & {
  jwt?: string;
  user?: Profile;
};

export type ErrorResponse = {
  data: object;
  error?: {
    status: number;
    name: string;
    message: string;
    details: object;
  };
};
export type LoginErrorResponse =
  | {
      identifier?: string;
      password?: string;
      ValidationError?: string;
    }
  | unknown;

export type Profile = {
  id?: number;
  username?: string;
  email: string;
  nombres: string;
  apellidos: string;
  confirmed?: boolean;
  provider: string;
  blocked?: boolean;
  createdAt?: string | undefined;
  updatedAt?: string | undefined;
  role?: {
    name: string;
    description: string;
    type: string;
    id: number;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
  };
};

export type CareerLocation = {
  faculty?: Facultad;
  career?: Carrera & { is_supervisor: boolean };
};

interface ReturnedMessage {
  detail: string;
  message: string;
  type?: "default" | "error" | "success" | "info" | "loading" | string;
}
