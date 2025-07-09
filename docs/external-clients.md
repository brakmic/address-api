# Example: Consuming Address API from External Clients

Below are minimal examples for calling the Address API from Python, C, C++, and C#.

---

## Python (requests)

### Environment Setup (Ubuntu 24.04+)

1. **Install pipx (recommended for Ubuntu 24.04+):**
   ```sh
   sudo apt update
   sudo apt install -y pipx
   pipx ensurepath
   ```
   > **Note:** After running `pipx ensurepath`, restart your shell or run `exec $SHELL` so `pipenv` can be found in your PATH.

2. **Install pipenv using pipx:**
   ```sh
   pipx install pipenv
   ```

3. **Navigate to the Python example directory:**
   ```sh
   cd address-api/examples/python
   ```

4. **Install dependencies from Pipfile:**
   ```sh
   pipenv install
   ```

5. **Run the client:**
   ```sh
   pipenv run python client.py
   ```
   Or, to enter a shell:
   ```sh
   pipenv shell
   python client.py
   ```

**Note:**  
If you are running this test inside a devcontainer, you may need to change the API URL in `client.py` to use `host.docker.internal` instead of `localhost` to reach the address-api running on your host.

```python
import requests

address = "123 Main St, Springfield"

# Use host.docker.internal if running in a devcontainer
API_URL = "http://host.docker.internal:3000"

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
```

---

## C (libcurl)

**Tested on:** Ubuntu 24.04  
**Install libcurl development files:**
```sh
sudo apt update
sudo apt install libcurl4-openssl-dev
```

**Save as `address_api_client.c`:**
```c
#include <stdio.h>
#include <string.h>
#include <curl/curl.h>

size_t write_callback(void *ptr, size_t size, size_t nmemb, void *userdata) {
    size_t total = size * nmemb;
    strncat((char *)userdata, (char *)ptr, total);
    return total;
}

int main(void) {
    CURL *curl;
    CURLcode res;
    char response[4096] = {0};
    const char *json = "{\"address\": \"123 Main St, Springfield\"}";

    curl_global_init(CURL_GLOBAL_DEFAULT);
    curl = curl_easy_init();
    if(curl) {
        struct curl_slist *headers = NULL;
        headers = curl_slist_append(headers, "Content-Type: application/json");

        curl_easy_setopt(curl, CURLOPT_URL, "http://localhost:3000/address/parse");
        curl_easy_setopt(curl, CURLOPT_POSTFIELDS, json);
        curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);
        curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, write_callback);
        curl_easy_setopt(curl, CURLOPT_WRITEDATA, response);

        res = curl_easy_perform(curl);
        if(res == CURLE_OK)
            printf("Parse response: %s\n", response);
        else
            fprintf(stderr, "curl_easy_perform() failed: %s\n", curl_easy_strerror(res));

        curl_slist_free_all(headers);
        curl_easy_cleanup(curl);
    }
    curl_global_cleanup();
    return 0;
}
```

**Compile and run:**
```sh
gcc -o client client.c -lcurl
./client
```

---

## C++ (libcurl)

**Tested on:** Ubuntu 24.04  
**Install libcurl development files:**
```sh
sudo apt update
sudo apt install libcurl4-openssl-dev
```

**Save as `client.cpp`:**
```cpp
#include <iostream>
#include <string>
#include <curl/curl.h>

static size_t WriteCallback(void* contents, size_t size, size_t nmemb, void* userp) {
    ((std::string*)userp)->append((char*)contents, size * nmemb);
    return size * nmemb;
}

int main() {
    CURL* curl = curl_easy_init();
    if(curl) {
        std::string readBuffer;
        std::string json = R"({"address": "123 Main St, Springfield"})";

        struct curl_slist* headers = NULL;
        headers = curl_slist_append(headers, "Content-Type: application/json");

        curl_easy_setopt(curl, CURLOPT_URL, "http://localhost:3000/address/parse");
        curl_easy_setopt(curl, CURLOPT_POSTFIELDS, json.c_str());
        curl_easy_setopt(curl, CURLOPT_HTTPHEADER, headers);
        curl_easy_setopt(curl, CURLOPT_WRITEFUNCTION, WriteCallback);
        curl_easy_setopt(curl, CURLOPT_WRITEDATA, &readBuffer);

        CURLcode res = curl_easy_perform(curl);
        if(res == CURLE_OK)
            std::cout << "Parse response: " << readBuffer << std::endl;

        curl_easy_cleanup(curl);
        curl_slist_free_all(headers);
    }
    return 0;
}
```

**Compile and run:**
```sh
g++ -o client client.cpp -lcurl
./client
```

---

## C# (.NET HttpClient)

**Tested on:** Ubuntu 24.04

### Install .NET SDK

```sh
sudo apt update
sudo apt install -y dotnet-sdk-9.0
```
> If you get a "package not found" error, you may need to enable the `ppa:dotnet/backports` repository:
> ```sh
> sudo add-apt-repository ppa:dotnet/backports
> sudo apt update
> sudo apt install -y dotnet-sdk-9.0
> ```

### Save as `Program.cs`:

```csharp
using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

class Program
{
    static async Task Main()
    {
        var client = new HttpClient();
        var address = new { address = "123 Main St, Springfield" };
        var json = System.Text.Json.JsonSerializer.Serialize(address);
        var content = new StringContent(json, Encoding.UTF8, "application/json");

        // Parse address
        var response = await client.PostAsync("http://localhost:3000/address/parse", content);
        var parseResult = await response.Content.ReadAsStringAsync();
        Console.WriteLine("Parse response: " + parseResult);

        // Normalize address
        response = await client.PostAsync("http://localhost:3000/address/normalize", content);
        var normalizeResult = await response.Content.ReadAsStringAsync();
        Console.WriteLine("Normalize response: " + normalizeResult);
    }
}
```

### Build and Run

```sh
dotnet new console -o client
mv Program.cs client/Program.cs
cd client
dotnet run
```

---


**Tip:**  
If you are running these examples in a devcontainer and need to reach the API on your host, change the URL in the code from `http://localhost:3000` to `http://host.docker.internal:3000`.