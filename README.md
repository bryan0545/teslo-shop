# Next.js Teslo Shop App

Para correr localmente, se necesita la base de datos

```
docker-compose up -d
```

- El -d, significa **detached**

- Mongodb URL local:

```
mongodb://localhost:27017/teslodb
```

## Recostruir los modulos del proyecto

```
yarn install
```

## Configurar las variables de entorno

Renombrar el Archivo **.env.template** a **.env**

## Llenar la base de datos con informacion de pruebas

Llamar a :

```
 http://localhost:3000/api/seed
```
