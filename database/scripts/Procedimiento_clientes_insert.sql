delimiter $$
 																
drop procedure if exists clientes_insert $$					


create procedure clientes_insert (
            xRazon_social varchar(60),
            xDireccion varchar(100)
)

begin
			declare vMensaje text;
            
            declare exit handler for sqlexception
			begin
				rollback;															
				get diagnostics condition 1 vMensaje = message_text;				
				select vMensaje AS 'result';
			end;
			
            start transaction;
				if xRazon_social is not null then
					insert into clientes 
							(razon_social, direccion)
					values
							( xRazon_social , xDireccion );
				else
					 SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'La razon social ingresada es  inválida.'; # EN caso de ser nula, msg de error destinado a valores ingresados mal
				end if;
           
			commit;                                                                   
			select 'Cliente agregado' AS 'result';	
           
end$$
#call clientes_insert("test", "test") ;
#select * from clientes;