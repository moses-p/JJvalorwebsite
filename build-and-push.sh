#!/bin/bash

# Configuration
DOCKER_USERNAME="arisegeniusug"
BACKEND_IMAGE="${DOCKER_USERNAME}/jj-valor-backend"
FRONTEND_IMAGE="${DOCKER_USERNAME}/jj-valor-frontend"
TAG="latest"

echo "Building and pushing J.J Valor Docker images to Docker Hub..."

# Login to Docker Hub
echo "Logging in to Docker Hub..."
docker login

# Build backend
echo "Building backend image..."
docker build -t ${BACKEND_IMAGE}:${TAG} ./backend

# Build frontend
echo "Building frontend image..."
docker build -t ${FRONTEND_IMAGE}:${TAG} .

# Push backend
echo "Pushing backend image..."
docker push ${BACKEND_IMAGE}:${TAG}

# Push frontend
echo "Pushing frontend image..."
docker push ${FRONTEND_IMAGE}:${TAG}

echo "Done! Images pushed to Docker Hub:"
echo "  - ${BACKEND_IMAGE}:${TAG}"
echo "  - ${FRONTEND_IMAGE}:${TAG}"
