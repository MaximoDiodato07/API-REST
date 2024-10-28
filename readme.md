## En este repositorio se encuentra el codigo para una aplicacion REST.
### En primer lugar aprendi a usar MYSQL, creando una BD, sus respectivas tablas, y sus SP's.
### Luego a consumir esto mismo desde PHP Puro, con un enfoque orientado a objetos.
### Por ultimo genere un front con diseño sencillo, donde puedo visualizar los datos, y poder enviar peticiones desde JS a una API.

## Pasos de instalacion:

### 1. Instalar los scripts deMySQL.
        - Primero el archivo: ISFT130_catalogo.sql
        - Luego los archivos que llenan las tablas. (su orden se indica, por ejemplo: "01_carga_...")
        - Luego de cargar los datos, ejecutar los scripts de procedimientos de almacenado (señalizados con "Procedimiento...")

### 2. Cambiar los datos de config.php, donde le paso la configuracion de la conexion a la BD.
        - $DB_HOST <- Nombre de hosting
        - $DB_NAME <- Nombre de la BD
        - $DB_USER <- Nombre de usario en BD
        - $DB_PASSWORD <- Contraseña  de la BD

        (Datos que se pueden visualizar desde MySQL Workbench, como el usuario root, y la contraseña).

### 3. Por ultimo testear que reciban los datos por parametros desde el front, y cambiar ruteos de ser necesario.
