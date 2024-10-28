delimiter $$													
 																
drop procedure if exists calcular_ganancias $$					


create procedure calcular_ganancias ()
begin
	declare vMensaje text;													 
    declare exit handler for sqlexception
    begin
		rollback;															
        get diagnostics condition 1 vMensaje = message_text;				
        select vMensaje AS 'result';
    end;
    
    start transaction;
		# Total vendido por día
         SELECT DAY(fecha) AS Dia, MONTH(fecha) AS mes, SUM(total) AS TotalVendido
		 FROM pedidos
		 WHERE anulado = 0
		 GROUP BY Dia, mes;
	
    
    commit;                                                                    
					    
end $$	

call calcular_ganancias();
#select * from pedidos;