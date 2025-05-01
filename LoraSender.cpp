#include <SPI.h>
#include <LoRa.h>

void setup() {
  Serial.begin(9600);
  LoRa.setPins(5, 14, 26); // NSS, RESET, DIO0
  if (!LoRa.begin(915E6)) {
    Serial.println("LoRa init failed.");
    while (1);
  }
}

void loop() {
  String data = "TO:BASE,FROM:ST1,wind=43,rain=2";

  LoRa.beginPacket();
  LoRa.print(data);
  LoRa.endPacket();

  delay(10000); // Send every 10s
}
