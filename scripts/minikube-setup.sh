#!/bin/bash
set -euo pipefail

echo "=== Starting Minikube ==="
minikube start

echo "=== Enabling Ingress Controller ==="
minikube addons enable ingress

echo "=== Enabling Metrics Server ==="
minikube addons enable metrics-server

echo "=== Building Docker images inside Minikube ==="
eval $(minikube docker-env)

docker build -t livyfy-backend:latest ./Livyfy
echo "  ✓ Backend image built"

docker build -t livyfy-ai:latest ./ai-service
echo "  ✓ AI service image built"

echo "=== Deploying manifests ==="
kubectl apply -f k8s/

echo ""
echo "=== Deployment Status ==="
kubectl get pods -w
