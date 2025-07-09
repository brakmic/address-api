#!/bin/sh
set -e

# Load environment variables if present
if [ -f .env ]; then
  export $(cat .env | xargs)
fi

echo "=================================================="
echo "  Address API is starting..."
echo "  RESTful endpoints:"
echo "    POST /address/parse"
echo "    POST /address/normalize"
echo ""
echo "  Swagger UI available at: \${API_BASE_URL:-http://localhost:3000}/api"
echo "=================================================="

exec node dist/main.js
