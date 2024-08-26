#include <SPI.h>
#include <MFRC522.h>
#include <ESP8266WiFi.h>
#include <HTTPClient.h>

// Definições do RFID
#define SS_PIN D4  // Pin de seleção do Slave (SS)
#define RST_PIN D3  // Pin de Reset
MFRC522 mfrc522(SS_PIN, RST_PIN);

// Dados do Wi-Fi
const char* ssid = "Gabrielly";          // Substituir pelo nome da sua rede Wi-Fi
const char* password = "porradesenha";     // Substituir pela senha da sua rede Wi-Fi

const char* serverName = "http://192.168.1.100:3000/api/rfid";  // Substituir pelo IP local do nosso servidor

void setup() {
  Serial.begin(115200);
  SPI.begin();           // Inicia o SPI
  mfrc522.PCD_Init();    // Inicia o módulo RFID

  // Conectar ao Wi-Fi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Conectando ao WiFi...");
  }
  Serial.println("Conectado ao WiFi");
}

void loop() {
  // Olha se tem um novo cartão RFID presente
  if (!mfrc522.PICC_IsNewCardPresent()) {
    return;
  }
  
  // Seleciona o cartão
  if (!mfrc522.PICC_ReadCardSerial()) {
    return;
  }

  // Lê o UID do cartão
  String rfidTag = "";
  for (byte i = 0; i < mfrc522.uid.size; i++) {
    rfidTag += String(mfrc522.uid.uidByte[i], HEX);
  }
  Serial.println("UID do cartão: " + rfidTag);
  
  // Enviar o UID para o servidor
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin(serverName);
    http.addHeader("Content-Type", "application/json");
    
    String httpRequestData = "{\"rfid\":\"" + rfidTag + "\"}";
    int httpResponseCode = http.POST(httpRequestData);
    
    if (httpResponseCode > 0) {
      String response = http.getString();
      Serial.println("Resposta do servidor: " + response);
    } else {
      Serial.println("Erro ao enviar POST: " + String(httpResponseCode));
    }
    
    http.end();
  } else {
    Serial.println("WiFi desconectado");
  }
  
  delay(2000);  // Aguardar antes de verificar outro cartão
}
