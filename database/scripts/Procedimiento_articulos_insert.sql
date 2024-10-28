delimiter $$
 																
drop procedure if exists articulos_insert $$					


create procedure articulos_insert (
			xidcategoria int,
            xCodigo varchar(20),
            xDescripcion varchar(60),
            xDescripcion_larga text,
            xPrecio decimal(20,2),
            xAlicuotaIva decimal(5,2)
)

begin
			declare vMensaje text;
			declare vExiste int;
            
            declare exit handler for sqlexception
			begin
				rollback;															/* indicador para cuando ocurre un error, que borra la transaccion (no modifica las tablas)*/
				get diagnostics condition 1 vMensaje = message_text;				/* Mensaje de error predefinido.*/
				select vMensaje AS 'result';
			end;
			
            start transaction;
            
            select	count(*)      										/*  Cuenta 1 */
			into	vExiste
			from	categorias
			where
				categorias.idcategoria = xidcategoria;    			/*  Si la categoria pasada por parametro, coincide con una ocurrencia dentro de la tabla */
			
			if vExiste > 0 then
					insert into articulos (
							idcategoria, codigo, descripcion, descripcion_larga, precio, alicuota_iva)
					values
							(xidcategoria, xCodigo, xDescripcion, xDescripcion_larga, xPrecio, xAlicuotaIva);
			else	
				select 'Categoria no existe';
            end if;         
			
			commit;                                                                   
			select 'Articulo agregado' AS 'result';	
           
end$$
#call articulos_insert (1000,'30''asd', 'prueba1',' ',30.5,21) ;
#select * from articulos;