# Address API

A RESTful API for parsing and normalizing addresses using [libpostal](https://github.com/openvenues/libpostal), built with [NestJS](https://nestjs.com/).  
This service exposes endpoints for address parsing and normalization, making it easy to integrate high-quality address handling into your applications.

---

## Features

- **/address/parse**: Parse an address string into structured components (e.g., house number, road, city).
- **/address/normalize**: Normalize an address string for consistent storage or comparison.
- **OpenAPI/Swagger UI**: Interactive API documentation at `/api`.
- **Dockerized**: Ready-to-use Docker image with libpostal built-in.
- **Kubernetes-ready**: Deploy with plain manifests or Helm.

---

## API Endpoints

### `POST /address/parse`

**Request:**
```json
{
  "address": "123 Main St, Springfield"
}
```

**Response:**
```json
{
  "components": [
    { "label": "house_number", "value": "123" },
    { "label": "road", "value": "Main St" },
    { "label": "city", "value": "Springfield" }
  ]
}
```

---

### `POST /address/normalize`

**Request:**
```json
{
  "address": "123 Main St, Springfield"
}
```

**Response:**
```json
{
  "normalized": "123 main st springfield"
}
```

---

## OpenAPI & Swagger UI

- The OpenAPI specification is available at `/api`.
- You can interact with the API and see example requests/responses in your browser.

---

## Running with Docker

The image is published at [Docker Hub](https://hub.docker.com/r/brakmic/address-api):

```sh
docker pull brakmic/address-api:latest
```

### **Important: .env file is required**

You **must** provide a `.env` file for the API to start.  
The easiest way is to copy the provided example:

```sh
cp .env.example .env
```

You can then edit `.env` to adjust settings (e.g., change the port or API base URL).

To run the API (mounting your `.env` file):

```sh
docker run --rm -it -p 3000:3000 -v "$PWD/.env:/usr/src/app/.env" brakmic/address-api:latest
```

- The API will be available at [http://localhost:3000](http://localhost:3000)
- Swagger UI: [http://localhost:3000/api](http://localhost:3000/api)

---

## Running with Kubernetes

### Using kubectl

1. Apply the manifests:
   ```sh
   kubectl apply -f k8s/yamls/deployment.yaml
   kubectl apply -f k8s/yamls/service.yaml
   kubectl apply -f k8s/yamls/ingress.yaml
   ```

2. Add `address-api.local` to your `/etc/hosts` pointing to your ingress controller's external IP.

3. Open the API:
   ```sh
   $BROWSER http://address-api.local/
   ```

4. To remove:
   ```sh
   kubectl delete -f k8s/yamls/ingress.yaml
   kubectl delete -f k8s/yamls/service.yaml
   kubectl delete -f k8s/yamls/deployment.yaml
   ```

---

### Using Helm

1. Go to the Helm chart directory:
   ```sh
   cd k8s/address-api-chart
   ```

2. Install the chart:
   ```sh
   helm install address-api .
   ```

3. Add `address-api.local` to your `/etc/hosts` as above.

4. Open the API:
   ```sh
   $BROWSER http://address-api.local/
   ```

5. To uninstall:
   ```sh
   helm uninstall address-api
   ```

---

## Example Clients

Example clients for this API are available in the following languages:

- **Python**
- **C**
- **C++**
- **C#**

See [docs/external-clients.md](docs/external-clients.md) for details on how to build and run these clients, including required environment setup.

---

## Environment Variables

You **must** provide a `.env` file (see `.env.example`).  
Copy the example and adjust as needed:

```sh
cp .env.example .env
```

Example contents:

```
NODE_ENV=production
PORT=3000
LIBPOSTAL_DATA_DIR=/usr/local/share/libpostal
API_BASE_URL=http://localhost:3000
```

You can change these values to fit your deployment (e.g., set a different port or base URL).

---

## License

[MIT](./LICENSE)
