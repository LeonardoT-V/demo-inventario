import paginationUtil from "@/lib/pagination";

export interface GetArticuloResponse {
  data: Articulo[];
  meta: Meta;
}

export interface ErrorMsg {
  status: string,
  name: string,
  message: string,
  details: Error
}

export interface GetOneArticuloResponse {
  data: Articulo;
  meta: Meta;
  error: ErrorMsg
}

export interface Articulo extends StrapiDefaultResponse {
  id: number;
  nombre: string;
  descripcion: string;
  ubicacion: string;
  habilitado: boolean;
  condicion: Condicion;
  registros: Registro[];
  carrera: Carrera;
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
export interface Condicion extends StrapiDefaultResponse {
  id: number;
  detalle: string;
}

export interface Carrera extends StrapiDefaultResponse {
  id: number;
  nombre: string;
  descripcion: string;
  habilitado: boolean;
  facultad: Facultad;
}
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
  nombre: string
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
  next?: number,
  prev?: number,
  total?: number,
  isFirt?: boolean,
  isLast?: boolean,
  actualPage?: number
  itemPerPage?: number,
}

export type ParamsPagination = ReturnType<typeof paginationUtil>

export type LoginResponse = ErrorResponse & {
  jwt?: string;
  user?: Profile;
};

export type ErrorResponse = {
  data?: object;
  error?: {
    status: number;
    name: string;
    message: string;
    details: object;
  };
}
export type LoginErrorResponse = {
  identifier?: string
  password?: string
  ValidationError?: string
} | unknown

export type Profile = {
  id?: number;
  username?: string;
  email?: string | undefined;
  confirmed?: boolean;
  provider: string;
  blocked?: boolean;
  createdAt?: string | undefined;
  updatedAt?: string | undefined;
};


export type CareerLocation = {
  faculty?: Facultad;
  career?: Carrera;
}