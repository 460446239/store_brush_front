##### Build Docker Image
```bash
docker build \
    -t "brush-frontedn:$(git rev-parse --short HEAD | tr -d '\n')"\
    .
```