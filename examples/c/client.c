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
    const char *base_url = "http://localhost:3000"; // or "http://host.docker.internal:3000" if running in Docker
    char response[4096] = {0};
    const char *json = "{\"address\": \"123 Main St, Springfield\"}";

    curl_global_init(CURL_GLOBAL_DEFAULT);
    curl = curl_easy_init();
    if(curl) {
        struct curl_slist *headers = NULL;
        headers = curl_slist_append(headers, "Content-Type: application/json");

        char url[256];
        snprintf(url, sizeof(url), "%s/address/parse", base_url);
        curl_easy_setopt(curl, CURLOPT_URL, url);
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
