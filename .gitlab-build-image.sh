#!/bin/bash

#stpo and rm all container
docker stop nodejs vuejs
docker rm nodejs vuejs

#pull cicd branch
cd ~/0525

#docker login for backend image repo
docker logout
docker login -u $docker_id_1 -p $docker_pw docker.io

#build backend docker image
cd backend
docker build -t $docker_id/backend:first .

#push backend docekr image to dockerhub
docker push $docker_id/backend:first


#docker login again for front image repo
docker logout
docker login -u $docker_id_2 -p $docker_pw docker.io

#build backend docker image
cd ../frontend
docker build -t $docker_id/frontend:first .

#push backend docekr image to dockerhub
docker push $docker_id/frontend:first