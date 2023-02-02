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
- POST /pets.
    * Recibe por body un objeto con las siguientes claves: **name, age, species, image, size, color, sex, temperament, adopted, deleted, userId** (si se quiere saber el tipo de los valores y cuales son obligatorias ver modelo pet en Huellitas/api/models/Pet.js).
- PUT /pets/{petId}.
    * Recibe por body un objeto con alguna de las siguientes claves **name, age, species, image, size, color, sex, temperament, adopted, deleted, userId** y actualiza la mascota de la base de datos cuto id sea petId.
- DELETE /pets/{petId}.
    * Borrado logico de la mascota que tenga como id petId.
- GET /users.
    * Trae todos los usuarios (a los que no se le haya aplicado borrado lógico).
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


