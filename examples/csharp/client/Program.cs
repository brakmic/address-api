using System;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

class Program
{
    static async Task Main()
    {
        string ApiUrl = "http://localhost:3000/"; // or host.docker.internal if running in Docker
        var client = new HttpClient();
        var address = new { address = "123 Main St, Springfield" };
        var json = System.Text.Json.JsonSerializer.Serialize(address);
        var content = new StringContent(json, Encoding.UTF8, "application/json");

        // Parse address
        var response = await client.PostAsync($"{ApiUrl}/address/parse", content);
        var parseResult = await response.Content.ReadAsStringAsync();
        Console.WriteLine("Parse response: " + parseResult);

        // Normalize address
        response = await client.PostAsync($"{ApiUrl}/address/normalize", content);
        var normalizeResult = await response.Content.ReadAsStringAsync();
        Console.WriteLine("Normalize response: " + normalizeResult);
    }
}
