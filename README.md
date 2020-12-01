d### Caseddd

A project that runs Node server and a react app via two separate containers, using Docker Compose.

# **Development**

In the development environment, the project directory is given as volume. Therefore, any changes you make on the project will change in the container instantly. At the same time, you will be able to get instant response because nodemon is used.

### - Under the hood

- NodeJS
- ReactJS

### - Prerequisites

- Docker

### - Installation

```

# clone repository

$ git clone https://baozdemir@bitbucket.org/symobile/docker-rn.git

```

Then if already created, check the properties, if not exist, create <b>.env</b> file ;

Sample via:

```
PORT=port

DB_USER=user

DB_PASSWORD=password

PASSWORD_SECRET=getir
```

And then;

```

$ docker-compose up

```

For development, `server/` and `client/` directories have their own docker containers, which are configured via the `docker-compose.yml` file.

The client server is running on `localhost:7100` and node server is `localhost:7101` too.

The local directories are mounted into the containers, so changes will reflect immediately. However, changes to package.json will likely need to a rebuild: `docker-compose down && docker-compose build && docker-compose up`.

### - Installing npm dependencies

All changes to `node_modules` should happen _inside_ the containers. Install any new dependencies by inside the container. You can do this via `docker-compose run`, but it’s easier to just upadte a running container and avoid having to rebuild everything:

```

$ docker exec -it React bash // -interactive (Keep STDIN open even if not attached) -tty (Allocate a pseudo-TTY)

```

Then inside:

```

$ npm install --save <new_dependency>

```

And then inside:

```

$ exit // Exit the container's attached console

```

### - Using docker compose

Start via:

```

$ docker-compose up



# or detached

$ docker-compose up -d

```

Run a single container via:

```

$ docker-compose up react

```

Check status:

```

$ docker-compose ps

```

Stop:

```

$ docker-compose down

```

NOTE : if any dependencies change in package.json files, you probably will need to rebuild the container for the changes to appear, e.g.,

```

$ docker-compose down

$ docker-compose build

$ docker-compose up

```
