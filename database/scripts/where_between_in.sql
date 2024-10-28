use isft130_catalogo;

# delete from articulos;
# alter table articulos auto_increment = 1;

#---------- Basic way to use more of a where
select 
	articulos.id_articulo as id,
	articulos.codigo,
    articulos.descripcion,
    categorias.descripcion as categoria
 from articulos
 inner join categorias
	on categorias.id_categoria = articulos.id_categoria
where
	articulos.id_articulo >= 3 AND
    articulos.id_articulo <= 6;
    
#---------- Basic way to use between
select 
	articulos.id_articulo as id,
	articulos.codigo,
    articulos.descripcion,
    categorias.descripcion as categoria
from articulos
inner join categorias
	on categorias.id_categoria = articulos.id_categoria
where
	articulos.id_articulo >= 3 AND
    articulos.id_articulo <= 6
order by articulos.codigo desc;


#---------- Basic way to use more of a where (with a order by)
select 
	articulos.id_articulo as id,
	articulos.codigo,
    articulos.descripcion,
    categorias.descripcion as categoria
from articulos
inner join categorias
	on categorias.id_categoria = articulos.id_categoria
where
	articulos.id_articulo between 3 AND 6
order by articulos.codigo desc;


#---------- Basic way to use In
select 
	articulos.id_articulo as id,
	articulos.codigo,
    articulos.descripcion,
    categorias.descripcion as categoria
from articulos
inner join categorias
	on categorias.id_categoria = articulos.id_categoria
where
	articulos.id_articulo in (3,4,5,6)
order by articulos.codigo desc;


#---------- Basic way to use In
select 
	a.id_articulo as id,
	a.codigo,
    a.descripcion,
    c.descripcion as categoria
from articulos a
inner join categorias c
	on c.id_categoria = a.id_categoria
where
	a.id_articulo in (3,4,5,6)
order by a.codigo desc;


#---------- Basic way to use In
select 
	c.descripcion as categoria,
	count(*) as cantidad
from categorias c
inner join articulos a
	on c.id_categoria = a.id_categoria
group by c.id_categoria
having cantidad > 2
order by cantidad desc;

# ejercicio: Lograr que se forme de manera descendente por cantidad