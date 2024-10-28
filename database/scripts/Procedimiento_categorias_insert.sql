delimiter $$													/* Cambiamos el caracter con el que se asigna el final de la sentencia, esto solo afecta fuera del procedure*/
 																
drop procedure if exists categoria_insert $$					/* Seria para "updatear" sin necesidad de eliminar manualmente el procedimiento */


create procedure categorias_insert (
	xDescripcion varchar(60) 												/* "xName" indicaremos con la "x" que es un parametro*/
)
begin
	declare vMensaje text;													 /* "vName" indicaremos con la "v" que es una variable*/
    declare exit handler for sqlexception
    begin
		rollback;															/* indicador para cuando ocurre un error, que borra la transaccion (no modifica las tablas)*/
        get diagnostics condition 1 vMensaje = message_text;				/* Mensaje de error predefinido.*/
        select vMensaje AS 'result';
    end;
    start transaction;
    insert into categorias(
		descripcion)
    values(
		xDescripcion);
	commit;                                                                    /* Subimos el cambio */
    select 'categoria agregada ok' AS 'result';							
    
end $$																		/* Como se indico en la primera sentencia, cerramos el codigo con "$$" */

																		