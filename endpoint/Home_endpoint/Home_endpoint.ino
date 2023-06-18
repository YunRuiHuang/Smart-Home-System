#include <WiFi.h>
#include <HTTPClient.h>
#include <DHT.h>

const char* ssid="Fios-vT4BM";
const char* password="P@55w0rd";
const int machineId = 4;
const String serverPath = "http://192.168.1.188:3000/dataPort/";
int postCounter = 0;

DHT dht(14,DHT11);

void setup()
{
delay(1000);
Serial.begin(115200);

pinMode(35, INPUT);
dht.begin();
connectWifi();
HttpGet(); 
}

void loop() {

int bright = analogRead(35);

float humidity = dht.readHumidity();
float temperature = dht.readTemperature();
if(isnan(humidity) || isnan(temperature)){
  Serial.println("fail to read dht data");
}else{  
  Serial.print("humidity : ");
  Serial.print(humidity);
  Serial.print("  temp : ");
  Serial.print(temperature); 
  Serial.print("  bright : ");
  Serial.println(bright); 
  HttpPost(machineId,temperature,humidity,bright);
}
  

for(int i =0; i< 10; i++){
  delay(60000);
}

}


//connect WIFI function
void connectWifi(){
  WiFi.begin(ssid, password);             // Connect to the network
  Serial.print("Connecting to ");
  Serial.println(ssid);

  int counter = 0;
  while (WiFi.status() != WL_CONNECTED) { // Wait for the Wi-Fi to connect
    delay(100);
    Serial.print('>');
    counter++;
    if(counter > 100){
      return;
    }
  }

  Serial.println("\n =======");
  Serial.println("Connection established!");
  Serial.print("IP address: ");
  Serial.println(WiFi.localIP());  
}


void HttpGet(){
  while(WiFi.status()!=WL_CONNECTED){
    connectWifi();
  }
  HTTPClient http;
  String targetPath = serverPath + "1";
  
  // Your Domain name with URL path or IP address with path
  http.begin(targetPath.c_str());
      
  // Send HTTP GET request
  int httpResponseCode = http.GET();
  
  if (httpResponseCode>0) {
    Serial.print("HTTP Response code: ");
    Serial.println(httpResponseCode);
    String payload = http.getString();
    Serial.println(payload);
  }else {
    Serial.print("Error code: ");
    Serial.println(httpResponseCode);
  }
  // Free resources
  http.end();
}

void HttpPost(int machineId,float temp,float humidity,int bright){
  while(WiFi.status()!=WL_CONNECTED){
    connectWifi();
  }
  
  postCounter++;
  if(postCounter > 50){
    ESP.restart();
  }

  HTTPClient http;
  WiFiClient client;
  String targetPath = serverPath + machineId;
  
  // Your Domain name with URL path or IP address with path
  http.begin(client,targetPath.c_str());

  // Specify content-type header  
  http.addHeader("Content-Type", "application/json");  

  String httpRequestData = "";
  httpRequestData = httpRequestData + "{\"temp\":\"" + temp;
  httpRequestData = httpRequestData + "\",\"humidity\":\"" + humidity;
  httpRequestData = httpRequestData + "\",\"bright\":\"" + bright + "\"}";
  Serial.println(httpRequestData);

  // Send HTTP GET request
  int httpResponseCode = http.POST(httpRequestData);
  
  Serial.print("HTTP Response code: ");
  Serial.println(httpResponseCode);
  String payload = http.getString();
  Serial.println(payload);

  // Free resources
  http.end();
}

