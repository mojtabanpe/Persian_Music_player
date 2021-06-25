echo "Building docker images"

docker build -t music-image:latest -f nginx/Dockerfile .

echo "Building successfull"

docker-compose -f docker-compose_prod.yml up -d