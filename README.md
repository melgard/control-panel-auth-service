# control-panel-auth-service
Servicio API Restful de Autenticación para el panel de administración.


## Docker Section
### Build the image with our Dockerfile.

``docker build -t {IMAGE_NAME} .``

Replace {IMAGE_NAME} with your service's name.

``docker run -p 3000:3000 -e MONGO_ADDRESS=172.17.0.2 -e MONGO_PORT=27017 --name={CONTAINER_NAME} {IMAGE_NAME}``

In this line we declare how run container from image.