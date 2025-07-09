import requests

address = "123 Main St, Springfield"

# Use host.docker.internal if running in Docker
API_URL = "http://localhost:3000"

# Parse address
resp = requests.post(
    f"{API_URL}/address/parse",
    json={"address": address}
)
print("Parse response:", resp.json())

# Normalize address
resp = requests.post(
    f"{API_URL}/address/normalize",
    json={"address": address}
)
print("Normalize response:", resp.json())
