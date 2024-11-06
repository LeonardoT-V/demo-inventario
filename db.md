// Use DBML to define your database structure
// Docs: https://dbml.dbdiagram.io/docs

Table usuario {
id integer [primary key]
username varchar
role varchar
created_at timestamp
}

Table facultad {
id integer [primary key]
edificio varchar
descripcion text
habilitado bool
}
Table carrera {
id integer [primary key]
nombre varchar
descripcion text
habilitado bool
facultadId integer
}
Table articulos {
id integer [primary key]
nombre varchar
descripcion text
habilitado bool
estado text
}
Table registro {
id integer [primary key]
fecha_registro varchar
descripcion text
habilitado bool
estado text
articuloId integer
usuarioId integer
carreraId integer
}

Table movimiento {
id integer [primary key]
usuarioId integer
articuloId interger
carreraId integer
tipo text
fecha text
}

Table condicion {
id integer [primary key]
detalle text
}

Ref: "facultad"."id" < "carrera"."facultadId"

Ref: "registro"."articuloId" < "articulos"."id"

Ref: "usuario"."id" < "registro"."usuarioId"

Ref: "articulos"."id" < "movimiento"."articuloId"

Ref: "carrera"."id" < "movimiento"."carreraId"

Ref: "usuario"."id" < "movimiento"."usuarioId"

Ref: "registro"."carreraId" > "carrera"."id"

Ref: "articulos"."estado" - "condicion"."id"
