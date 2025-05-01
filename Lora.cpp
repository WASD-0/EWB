#include <SPI.h>
#include <LoRa.h>
// file responible to send data 
void setup() {
  Serial.begin(9600);
  LoRa.setPins(5, 14, 26); // NSS, RESET, DIO0
  if (!LoRa.begin(433E6)) {
    Serial.println("LoRa init failed");
    while (1);
  }
}

void loop() {
  String data = "station1,wind=40,rain=3";
  LoRa.beginPacket();
  LoRa.print(data);
  LoRa.endPacket();
  delay(10000); // send every 10s
}
