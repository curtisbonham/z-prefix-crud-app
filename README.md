# Z-Prefix CRUD Application Submission
This is my submission for the CRUD application portion of the z-prefix assessment. Below you will find instructions on how to spin up the application.

## Setting up the database
1. Ensure that you have a docker container with a postgres database. The command string that was utilized in the development of this app is as follows:

```
docker run --rm --name pg-docker -e POSTGRES_PASSWORD=(INPUT YOUR OWN PASSWORD) -d -p 5432:5432 \ -v $HOME/docker/volumes/postgres : /ver/lib/postgresql/data postgres
```

**MAKE NOTE** the "INPUT YOUR OWN PASSWORD" does NOT indicate that is the password, ensure you configure your docker with a password you will remember.

2. You will now need to run:

```
docker ps -a
```

To grab the container ID you just created so that you can access your postgreSQL image you also just set up and create a database.

3. You are able to utilize any name you see fit. You will need to remember the database for your .env file later.

## Setting up the server
1. To have the server connect with the database, a .env file was utilized. Ensure that you create a .env file within the server directory:

```
touch .env
```
2. Within the .env file you will need to create your environment variables. Below is an example, but you will need to input the proper variable assignments indicated to the right of the equals sign.

```
DB_PASSWORD=**Input your database passwor**
DB_USER=**Input your database username**
DB_PORT=**Input the port your database is communicating on**
DB_NAME=**Input the name of the database you chose**
PG_DB_HOST=**Input the URL your computer is communicating on, it is typically localhost**
```

3. As long as your .env file is set up properly, the knexfile.js should be configured properly as well.
