#include <SPI.h>
#include <Wire.h>
#include <Adafruit_GFX.h>
#include <Adafruit_SSD1306.h>
#include <Wire.h>
#include "SparkFunHTU21D.h"

int measurePin = A0;
int ledPower = D0;

unsigned int samplingTime = 280;
unsigned int deltaTime = 40;
unsigned int sleepTime = 9680;

float voMeasured = 0;
float calcVoltage = 0;
float dustDensity = 0;

HTU21D myHumidity;

#define OLED_RESET LED_BUILTIN  //4
Adafruit_SSD1306 display(OLED_RESET);

void setup() {
  Serial.begin(9600);
  pinMode(ledPower,OUTPUT);
  display.begin(SSD1306_SWITCHCAPVCC, 0x3C);
  myHumidity.begin();
  display.setTextSize(2);
  display.setTextColor(WHITE);
}

void draw0(float x) {
  display.clearDisplay();
  display.setTextSize(2);
  display.setCursor(0,20);
  display.println("Humd");
  display.display();
  display.setTextSize(2);
  display.setCursor(0,50);
  display.println(x);
  display.display();
  display.setTextSize(2);
  display.setCursor(70,50);
  display.println("%");
  display.display();
}

void draw1(float x) {
  display.clearDisplay();
  display.setTextSize(2);
  display.setCursor(0,20);
  display.println("Temp");
  display.display();
  display.setTextSize(2);
  display.setCursor(0,50);
  display.println(x);
  display.display();
  display.setTextSize(2);
  display.setCursor(70,50);
  display.println("C");
  display.display();
}

void draw2(float x) {
  display.clearDisplay();
  display.setTextSize(2);
  display.setCursor(0,20);
  display.println("Dust Desnsity");
  display.display();
  display.setTextSize(2);
  display.setCursor(0,50);
  display.println(x);
  display.display();
}

void loop() {
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
  float humd = myHumidity.readHumidity();
  float temp = myHumidity.readTemperature();
  draw0(humd);
  delay(2500);
  draw1(temp);
  delay(2500);
  draw2(dustDensity);
  delay(2500);
}
