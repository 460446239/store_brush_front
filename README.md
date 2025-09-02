##### Build Docker Image
```bash
docker build \
    -t "brush-frontend:$(git rev-parse --short HEAD | tr -d '\n')"\
    .
```