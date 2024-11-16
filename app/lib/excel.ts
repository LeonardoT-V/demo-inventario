export const articleSchema = [
  {
    column:'Id',
    type: Number,
    value: art => art.id
  },
  {
    column:'Nombre',
    type: String,
    value: art => art.nombre
  },
  {
    column:'Descripcion',
    type: String,
    value: art => art.descripcion
  },
  {
    column:'Creado el',
    type: String,
    value: art => art.createdAt
  },
  {
    column:'Creado por',
    type: String,
    value: art => art.createdBy
  },
  {
    column:'Aula',
    type: String,
    value: art => art.aula
  },
  {
    column:'condición',
    type: String,
    value: art => art.condicion
  },
  {
    column:'Registrado por',
    type: String,
    value: art => art.registrado.email
  }
]
export const mantenimientoIdSchema = [
  {
    column:'Tipo de mantenimiento',
    type: String,
    value: mant => mant.tipo
  },
  {
    column:'Detalle',
    type: String,
    value: mant => mant.detalle
  },
  {
    column:'Comentario',
    type: String,
    value: mant => mant.comentario
  },
  {
    column:'Registrado el',
    type: String,
    value: mant => mant.createdAt
  },
  {
    column:'Registrado por',
    type: String,
    value: mant => mant.encargado.email
  }
]

export const mantenimientoSchema = [
  {
    column:'Articulo',
    type: String,
    value: mant => mant.articulo.nombre
  },
  ...mantenimientoIdSchema
]
export const cambiosIdSchema = [
  {
    column:'Tipo de cambio',
    type: String,
    value: camb => camb.tipo
  },
  {
    column:'llave',
    type: String,
    value: camb => camb.llave
  },
  {
    column:'Prev valor',
    type: String,
    value: camb => camb.prev_value
  },
  {
    column:'Nuevo valor',
    type: String,
    value: camb => camb.new_value
  },
  {
    column:'Comentario',
    type: String,
    value: camb => camb.comentario
  },
  {
    column:'Responsable',
    type: String,
    value: camb => camb.responsable.email
  }
]
export const cambiosSchema = [
  {
    column:'Articulo',
    type: String,
    value: camb => camb.articulo.nombre
  },
  {
    column:'Articulo Id',
    type: Number,
    value: camb => camb.articulo.id
  },
  ...cambiosIdSchema
]

export const fetchForExcel = async(url, ) => {
  const data = []
  let totalPage = 1
  let page= 0
  do {
    page = page + 1
    const resArticle = await fetch(url + `&pagination[page]=${page}`)
    const {data: resData, meta} = await resArticle.json()
    totalPage = meta?.pagination?.pageCount ?? 1
    // @ts-expect-error push data to array
    data.push(...resData)
  } while (page <= totalPage);
  return data
};