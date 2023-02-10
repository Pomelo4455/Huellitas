# Api Proyecto Final

## Instrucciones para correr el back

- Crearse una base de datos en postgres.
- Crear un .env con las variables DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME (autodescriptivas) dentro de la carpeta api a la altura de app.js, db.js, etc.
- Abrir una terminal ubicada en la carpeta api.
- Ejecutar el comando npm install.
- Ejecutar el comando npm start.

## Rutas

- GET /pets.
    * Trae todas las mascotas (a las que no se le haya aplicado borrado lógico).
- GET /pets/{petId}
    * Trae la mascota de la base de datos cuyo id coincida con petId.
- GET /pets?name={namePet}&species={speciesPet}&size={sizePet}&sex={sexPet}&order={orderPet}
    * Puede recibir ninguno (ruta pets), algunos o todos los parámetros por query y retorna las mascotas que incluyan namePet en su name, tengan como atributo species, size y sex los valores speciesPet, sizePet y sexPet respectivamente en el orden que indique orderPet.
    * namePet puede ser cualquier string. 
    * speciesPet, sizePet y sexPet pueden ser cualquier valor de la enum de las species, size y sex definidas en el modelo respectivamente (ver modelo en Huellitas/api/models/Pet). 
    * orderPet debe tener el siguiente formato **atributte_type** donde atributte es alguno de los atributos que tiene una mascota en el modelo (ver modelo en Huellitas/api/models/pet), por su parte, size solo puede tomar los valores "ASC" o "DESC" para indicar orden tipo ascendente o descendente respectivamente
- POST /pets.
    * Recibe por body un objeto con las siguientes claves: **name, age, species, image, size, color, sex, temperament, adopted, deleted, userId** (si se quiere saber el tipo de los valores y cuales son obligatorias ver modelo pet en Huellitas/api/models/Pet.js).
- PUT /pets/{petId}.
    * Recibe por body un objeto con alguna de las siguientes claves **name, age, species, image, size, color, sex, temperament, adopted, deleted, userId** y actualiza la mascota de la base de datos cuto id sea petId.
- DELETE /pets/{petId}.
    * Borrado logico de la mascota que tenga como id petId.
- GET /users.
    * Trae todos los usuarios (a los que no se le haya aplicado borrado lógico).
- GET /users?name={nameUser}
    * retorna los users de la base de datos que contengan nombreUser en su nombre
    * nameUser puede ser cualquier string.
- GET /users/{userId}.
    * Trae el usuario de la base de datos cuyo id coincida con userId.
- POST /users.
    * Recibe por body un objeto con las siguientes claves: **type, name, email, phone, password, address, description, facebook, instagram, twitter, tiktok, image, CVU, status** (si se quiere saber el tipo de los valores y cuales son obligatorias ver modelo user en Huellitas/api/models/User.js).
- PUT /users/{userId}.
    * Recibe por body un objeto con alguna de las siguientes claves **type, name, email, phone, password, address, description, facebook, instagram, twitter, tiktok, image, CVU, status** y actualiza la mascota de la base de datos cuto id sea userId.
- DELETE /users/{userId}.
    * Borrado logico del usuario que tenga como id userId.
- GET /campaigns.
    * Trae todas las campañas de donación (a las que no se le haya aplicado borrado lógico).
- GET /campaigns/{campaignsId}
    * Trae la campaña de donación de la base de datos cuyo id coincida con campaignsId.
- POST /campaigns.
    * Recibe por body un objeto con las siguientes claves: **title, reason, description, image, goal, status** (si se quiere saber el tipo de los valores y cuales son obligatorias ver modelo campaign en Huellitas/api/models/Campaign.js).
- PUT /campaigns/{campaignsId}.
    * Recibe por body un objeto con alguna de las siguientes claves ***title, reason, description, image, goal, status** y actualiza la mascota de la base de datos cuto id sea campaignsId.
- DELETE /pets/{campaignsId}.
    * Borrado logico de la campaña que tenga como id campaignId.

## Instrucciones para deployar el back

- Chequear que en el "scripts" del package.json de /api el comando "start" ejecute lo siguiente: "node ./index.js".
- Agregar las siguientes variables de entorno al .env que está adentro de /api:
    - DB_DEPLOY=postgresql://postgres:L1ytoWiC2Pfpuf7GGmzR@containers-us-west-183.railway.app:7249/railway
    - PORT=3001
- Descomentar la opción 2 dentro de "db.js", y comentar la opción 1.
- Ir a postman o la aplicación que usen para cargar los datos y hacer un post a "http://localhost:3001/".
- Recuerden utilizarlo lo menos posible, ya que la cantidad de pedidos que le podemos hacer al servidor remoto es limitada.
## .Env configuración
### Agregar las siguientes variables al archivo .env de api:
- APP_PASSWORD_NODEMAILER = gdmrvfsbqonuieih
- MERCADOPAGO_KEY= TEST-293281331158507-020717-70b9282513602337f43a8d61500c40f9-1305153224
