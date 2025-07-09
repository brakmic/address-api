### Deploy with Helm

# Deploying address-api with Helm

1. **Package or use the chart directory:**
   ```bash
   cd address-api-chart
   ```

2. **Install the chart:**
   ```bash
   helm install address-api .
   ```

   Or to customize values:
   ```bash
   helm install address-api . -f my-values.yaml
   ```

3. **Check resources:**
   ```bash
   kubectl get all
   ```

4. **Access the API:**
   - Add `address-api.local` to your hosts pointing to your ingress controller's external IP.
   - Open in your browser:
     ```bash
     $BROWSER http://address-api.local/
     ```

5. **Uninstall:**
   ```bash
   helm uninstall address-api
   ```
---

### Deploy with kubectl

# Deploying address-api with kubectl

1. **Apply all manifests:**
   ```bash
   kubectl apply -f k8s/yamls/deployment.yaml
   kubectl apply -f k8s/yamls/service.yaml
   kubectl apply -f k8s/yamls/ingress.yaml
   ```

2. **Check resources:**
   ```bash
   kubectl get all
   ```

3. **Access the API:**
   - Add `address-api.local` to your hosts pointing to your ingress controller's external IP.
   - Open in your browser:
     ```bash
     $BROWSER http://address-api.local/
     ```

4. **Delete resources:**
   ```bash
   kubectl delete -f k8s/yamls/ingress.yaml
   kubectl delete -f k8s/yamls/service.yaml
   kubectl delete -f k8s/yamls/deployment.yaml
   ```
