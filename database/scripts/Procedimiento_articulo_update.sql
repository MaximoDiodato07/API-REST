delimiter $$
 																
drop procedure if exists articulo_update $$					


create procedure articulo_update(
			IN xID int,
			IN xidcategoria int,
            IN xCodigo varchar(20),
            IN xDescripcion varchar(60),
            IN xPrecio decimal(20,2)
)

begin
			declare vMensaje text;
            declare vExiste int;
            
            declare exit handler for sqlexception
			begin
				rollback;															
				get diagnostics condition 1 vMensaje = message_text;
				select vMensaje AS 'result';
            end;
            
            start transaction;
			
            /* Validacion de categoria.*/
            IF xIdCategoria IS NOT NULL THEN
				select	count(*)      										/*  Cuenta 1 */
				into	vExiste
				from	categorias
				where
					categorias.idcategoria = xidcategoria;  
            
				if vExiste = 0 then      /*  se valida si existe la categoria pasada como parametro. en caso '0' no existe */
					SIGNAL SQLSTATE '02000' SET message_text = 'No se encontró la categoria ingresada.'; /*  Error de sql utilizado cuando no se encuentra algo (NOT FOUND)*/
                end if;	
            END IF;

            update articulos set 
				descripcion = ifnull(xDescripcion, descripcion),  		/* "ifnull" analiza el primer valor pasado, en caso de no ser nulo, define este como el nuevo valor,*/
				idcategoria = ifnull(xidcategoria, idcategoria),       /*sino el valor queda igual al que estaba (pasado como 2do parametro)*/
				codigo =  ifnull(xCodigo, codigo),
				precio = ifnull(xPrecio, precio)
			where idarticulo = xID;
            
            commit; 
			select 'Articulo editado' AS 'result';	
end$$

/* call articulo_update(1,2,'5','Producto 2.1', 50.6);
select * from articulos
where idarticulo = 1; */
	