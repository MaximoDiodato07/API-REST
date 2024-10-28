update clientes
set 
	clientes.habilitado = 0
where 
	clientes.id_cliente = 2;
    
select * from clientes;

/* En este update, cambio el campo "habilitado" que es bit, para setearlo en 0 , es decir, estaria "deshabilitado" */