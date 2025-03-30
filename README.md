# Random Temperature REST Api app

## stack 

1. Bun 
2. Hono
3. Keyv
4. Dagger

## Development

1. pull code
2. bun install
3. bun dev


## Build

### Build and publish

```sh
DAGGER_NO_NAG=1 dagger call -i publish --source=. --image-tag=<image name> --progress=plain
```

### Build and export image to local file system
```sh
DAGGER_NO_NAG=1 dagger call build --source=. export --path=./img/a.tgz
docker load -i ./img/a.tgz
```

then image will load but have no tag yet  
it live in the docker system as dangling image

so we need to tag it before run the image 

```sh
docker tag <hash 4-7 chars is enough> <new tag>
```
