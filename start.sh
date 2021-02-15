docker kill lpg-app-frontend
docker rm lpg-app-frontend
docker build . -t lpg-app-frontend
docker run  -d -p 3000:3000 --name lpg-app-frontend lpg-app-frontend
echo "Service Started..."
