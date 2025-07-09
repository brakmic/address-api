#!/bin/sh
set -e

IMAGE_NAME="brakmic/address-api:latest"

# Determine the build root (project root)
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
CALL_DIR="$(pwd)"

if [ "$CALL_DIR" = "$SCRIPT_DIR" ]; then
  BUILD_ROOT=".."
else
  BUILD_ROOT="."
fi

# Build the Docker image using the correct context
docker build -t $IMAGE_NAME -f "$SCRIPT_DIR/Dockerfile" "$BUILD_ROOT"

# Run the container, mounting the .env file if it exists
if [ -f "$BUILD_ROOT/.env" ]; then
  echo "Mounting .env file into container..."
  docker run --rm -it -p 3000:3000 -v "$(realpath "$BUILD_ROOT/.env")":/usr/src/app/.env $IMAGE_NAME
else
  echo "No .env file found, running without it..."
  docker run --rm -it -p 3000:3000 $IMAGE_NAME
fi
