#include <WiFi.h>
#include <WiFiClient.h>
#include <WiFiServer.h>
#include <WiFiUdp.h>

#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>
#include <Wire.h>
#include <SPI.h>
#include <MFRC522.h>

// Defina os pinos usados pelo módulo RFID
#define SS_PIN 4
#define RST_PIN 5

MFRC522 mfrc522(SS_PIN, RST_PIN); // Cria uma instância do MFRC522

// Configurações da rede Wi-Fi
const char* ssid = "YOUR_SSID";
const char* password = "YOUR_PASSWORD";

// URL do servidor Node.js
const char* serverUrl = "http://YOUR_SERVER_IP:3000/api/rfid";

void setup() {
  Serial.begin(115200); // Inicializa a comunicação serial
  WiFi.begin(ssid, password); // Conecta à rede Wi-Fi
  
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("Conectado ao Wi-Fi!");

  mfrc522.PCD_Init(); // Inicializa o módulo RFID
}

void loop() {
  if (!mfrc522.PICC_IsNewCardPresent()) {
    return;
  }

  if (!mfrc522.PICC_ReadCardSerial()) {
    return;
  }

  String rfidUID = "";

  // Construa a string do UID do RFID
  for (byte i = 0; i < mfrc522.uid.size; i++) {
    rfidUID += String(mfrc522.uid.uidByte[i] < 0x10 ? "0" : "");
    rfidUID += String(mfrc522.uid.uidByte[i], HEX);
  }
  rfidUID.toUpperCase();

  // Envia o UID do RFID para o servidor
  sendRFIDToServer(rfidUID);

  delay(5000); // Aguarda 5 segundos antes de ler o próximo cartão
}

void sendRFIDToServer(String rfidUID) {
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    http.begin(serverUrl); // Inicializa a conexão HTTP

    http.addHeader("Content-Type", "application/json"); // Define o tipo de conteúdo

    // Cria o JSON com o UID do RFID
    String payload = "{\"rfid\":\"" + rfidUID + "\"}";
    int httpResponseCode = http.POST(payload); // Envia a requisição POST

    if (httpResponseCode > 0) {
      String response = http.getString();
      Serial.println("Resposta do servidor: " + response);
    } else {
      Serial.println("Erro na requisição HTTP: " + String(httpResponseCode));
    }

    http.end(); // Fecha a conexão HTTP
  } else {
    Serial.println("Erro de conexão Wi-Fi");
  }
}