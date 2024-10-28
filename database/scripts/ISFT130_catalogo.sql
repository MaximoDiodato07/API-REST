create database isft130_catalogo;
use isft130_catalogo;


create table if not exists categorias (
	idcategoria int not null unique auto_increment,
    descripcion varchar(60) not null,
    PRIMARY KEY (idcategoria)
);

create table if not exists clientes (
	id_cliente int not null unique auto_increment,
    razon_social varchar(60) not null,
    direccion varchar(100),
    habilitado bit not null default 1,
    PRIMARY KEY (id_cliente)
);

create table if not exists articulos (
	idarticulo int not null unique auto_increment,
    idcategoria int not null,
    codigo varchar(20) not null,
    descripcion varchar(60) not null,
    descripcion_larga text,
    precio decimal(20,2) not null,
    alicuota_iva decimal(5,2) not null,
    habilitado bit not null default 1,
    PRIMARY KEY (idarticulo),
    foreign key (idcategoria) references categorias(idcategoria)
);

create table if not exists pedidos (
	id_pedido int not null unique auto_increment,
    id_cliente int not null,
    fecha datetime not null default CURRENT_TIMESTAMP,
    anulado bit not null default 0,
    observaciones text,
    total_neto decimal(20,2) not null,
    total decimal(20,2)not null,
    primary key (id_pedido),
    foreign key (id_cliente) references clientes(id_cliente)
);

create table if not exists items (
	id_item int not null auto_increment,
    id_pedido int not null,
    idarticulo int not null,
    cantidad decimal (20,2) not null,
    precio_unitario decimal (20,2) not null,
    alicuota_iva decimal (5,2) not null,
    total_neto decimal (20,2) not null,
    total decimal (20,2) not null,
	primary key(id_item, id_pedido),
    foreign key(id_pedido) references pedidos (id_pedido),
    foreign key(idarticulo) references articulos (idarticulo)
);
