#include <SPI.h>
#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
#include <Wire.h>
#include "SparkFunHTU21D.h"
#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include <Arduino.h>

#define ets_wdt_disable ((void (*)(void))0x400030f0)
#define ets_delay_us ((void (*)(int))0x40002ecc)
#define _R (uint32_t *)0x60000700
#define OLED_RESET LED_BUILTIN  //4
Adafruit_SSD1306 display(OLED_RESET);

const char* ssid = "Honor Play";
const char* password = "1010101010";
const char* mqtt_server = "mqtt.eclipse.org";
const char* mqtt_topic = "Lunar-Data";

int node_number = 5;

int measurePin = A0;
int ledPower = D0;

unsigned int samplingTime = 280;
unsigned int deltaTime = 40;
unsigned int sleepTime = 9680;

float voMeasured = 0;
float calcVoltage = 0;
float dustDensity = 0;
float temp = 0;
float humidity = 45;

HTU21D myHumidity;

WiFiClient espClient;
PubSubClient client(espClient);

void deep_sleep(uint64_t time)
{
  ets_wdt_disable();
  *(_R + 4) = 0;
  *(_R + 17) = 4;
  *(_R + 1) = *(_R + 7) + 5;
  *(_R + 6) = 8;
  *(_R + 2) = 1 << 20;
  ets_delay_us(10);
  *(_R + 39) = 0x11;
  *(_R + 40) = 3;
  *(_R) &= 0xFCF;
  *(_R + 1) = *(_R + 7) + (45*(time >> 8));
  *(_R + 16) = 0x7F;
  *(_R + 2) = 1 << 20;
  __asm volatile ("waiti 0");
}

void setup_wifi() {
  delay(10);
  Serial.println();
  Serial.print("Connecting To Network");
  Serial.println(ssid);
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  randomSeed(micros());
  Serial.println("");
  Serial.println("Connected To Local Network");
}

void reconnect() {
  while (!client.connected()) {
    Serial.print("Attempting MQTT broker connection...");
    String clientId = "ESP8266Client-";
    clientId += String(random(0xffff), HEX);
    if (client.connect(clientId.c_str())) {
      Serial.println("connected");

    }
    else {
      Serial.print("failed, rc=");
      Serial.print(client.state());
      Serial.println("Trying Again in 5 seconds");
      delay(5000);
    }
  }
}

void publish_data(String mode) {
  if(client.connected())
  {
    String msg = String(node_number) + "/" + mode + "/" + String(dustDensity) + "/" + String(temp) + "/" + String(humidity);
    char msgAsCharAway[msg.length()];
    msg.toCharArray(msgAsCharAway, msg.length());
  
    Serial.print(msg);
    client.publish(mqtt_topic, msgAsCharAway);
  }
}

void write_oled(String x) {
  display.clearDisplay();
  display.setTextSize(2);
  display.setCursor(0,8);
  display.println(x);
  display.display();
}

void setup() {  
  display.begin(SSD1306_SWITCHCAPVCC, 0x3C);
  display.setTextSize(2);
  display.setTextColor(WHITE);
  pinMode(D4,OUTPUT);
  digitalWrite(D4,HIGH);
  digitalWrite(D4,LOW); 
  delay(1500);
  write_oled("I am awake");
  Serial.begin(115200);
  write_oled("Acquiring Connection..");
  delay(3000);
  setup_wifi();
  write_oled("Connected!!");
  delay(1500);
  write_oled("Connecting MQTT\nBroker..");
  delay(3000);   
  client.setServer(mqtt_server, 1883);
  write_oled("Connected!!");
  delay(1500);
  write_oled("Taking \nReadings");
  delay(2000);       
  pinMode(ledPower,OUTPUT);
  myHumidity.begin();

  digitalWrite(ledPower,LOW);
  delayMicroseconds(samplingTime);

  voMeasured = analogRead(measurePin);

  delayMicroseconds(deltaTime);
  digitalWrite(ledPower,HIGH);
  delayMicroseconds(sleepTime);

  calcVoltage = voMeasured*(5.0/1024);
  dustDensity = 0.17*calcVoltage-0.1;
  if ( dustDensity < 0)
  {
    dustDensity = 0.00;
  }  
  temp = myHumidity.readTemperature();

  if (!client.connected()) {
    while(!client.connected()){
      reconnect();
    }
  }
  write_oled("Publishing Data..");
  delay(2500);
  publish_data("Passive");
  client.loop();
  write_oled("Data \nPublished");
  delay(1500);
  write_oled("Going to \nDeep Sleep");
  pinMode(D7,OUTPUT);
  digitalWrite(D7,HIGH);
  delay(2500);
  digitalWrite(D7,LOW);  
  deep_sleep(10 * 1000000);
}

void loop() {

}
