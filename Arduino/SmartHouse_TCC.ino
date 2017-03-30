
#include <ESP8266.h>

//DHT
const int LM35 = A5; // pino que estamos conectado
float temp; // Variável que armazenará a temperatura medida

//DADOS DO WIFI
#define WIFI_SSID "SSIDNetwork"
#define WIFI_PSK "SSIDPassword"

//DADOS SERVIDOR
#define HOST_NAME   "IPHOST"
#define HOST_PORT   (5000)

ESP8266 wifi(Serial2);

//SAIDAS
const int LAMP_RESPOSTA = 13;

//Sensor
const int pinSensorPIR = 2;
const int pinBuzzer = 53;

//IluminaÃ§Ã£o Interna
const int SALALAMP = A0; //Sala lampada
const int QTD1LAMP = 23; //Quarto 1 lampada
const int QTD2LAMP = 24; //Quarto 2 lampada
const int COZILAMP = A7; //Cozinha lampada
const int VENTIL = 26; //Ventilador

//IluminaÃ§Ã£o Externa
const int AREAEXTE = A3; 

const int VARANDAC = 36;

const int JARDIMEXT = A9;

const int PORTCARRA = 42;
const int PORTCARRF = 44;
const int PORTSOCIA = A13;
const int PORTSOCIF = A14;

//OUTPUT ALARME
const int ALARME = 0;

//VARIAVEIS AUXILIARES
char c;
char resposta;
String tratado;
int estadoLEDSALA = 0;
int estadoLEDQTD1 = 0;
int estadoLEDQTD2 = 0;
int estadoLEDCOZI = 0;
int estadoLEDPOST = 0;
int estadoLEDJARD = 0;
String ComandoEnviar = "";
String Enviado = "SIM";
int AlarmeATIVADO = 0;
unsigned long ult_tempo = 0;

void setup()
{
  //Inicializando serial do Arduino e do ESP82266 para conexÃ£o ao WebPage
  Serial.begin(9600);
  Serial2.begin(9600); //BaudRate padrÃ£o do ESP8266
  Serial.print("Iniciando Setup\r\n");

  pinMode(LAMP_RESPOSTA, OUTPUT);
  digitalWrite (LAMP_RESPOSTA, LOW);

  //CONECTAR WIFI CONFORME CONFIGURAÃ‡Ã•ES
  conectarWifi();

  pinMode(pinSensorPIR, INPUT);
  pinMode(pinBuzzer,OUTPUT);

  pinMode(QTD1LAMP, OUTPUT); // Configura o pino do led (digital) como saÃ­da
  pinMode(QTD2LAMP, OUTPUT); // Configura o pino do led (digital) como saÃ­da
  pinMode(SALALAMP, OUTPUT); // Configura o pino do led (digital) como saÃ­da
  pinMode(COZILAMP, OUTPUT); // Configura o pino do led (digital) como saÃ­da
  pinMode(JARDIMEXT, OUTPUT);

  pinMode(AREAEXTE, OUTPUT);
  pinMode(VARANDAC, OUTPUT);
  pinMode(PORTSOCIA, OUTPUT); // Configura o pino do led (digital) como saÃ­da
  digitalWrite(PORTSOCIA, HIGH);
  pinMode(PORTSOCIF, OUTPUT); // Configura o pino do led (digital) como saÃ­da
  digitalWrite(PORTSOCIF, HIGH);
  pinMode(PORTCARRA, OUTPUT); // Configura o pino do led (digital) como saÃ­da
  digitalWrite(PORTCARRA, HIGH);
  pinMode(PORTCARRA, OUTPUT); // Configura o pino do led (digital) como saÃ­da
  digitalWrite(PORTCARRA, HIGH);
  pinMode(PORTCARRF, OUTPUT); // Configura o pino do led (digital) como saÃ­da
  digitalWrite(PORTCARRF, HIGH);

  pinMode(21, INPUT_PULLUP);
  pinMode(20, INPUT_PULLUP);
  pinMode(19, INPUT_PULLUP);
  pinMode(18, INPUT_PULLUP);
  pinMode(47, INPUT_PULLUP);
  pinMode(7, INPUT_PULLUP);
}

void interrupcaoALARME() {
    Serial.print("\nSENSOR ATIVADO\r\n\r\n");
    tone(pinBuzzer,1500);
    delay(2000); //tempo que o led fica acesso e o buzzer toca
}

void loop()
{
  AlarmeATIVADO = 0;
  VerificaBotoes();
  VerificaSaidas();
  Acionamento();
  EnviaTemp();
  EnviaSaida();
}

void VerificaBotoes(){
  if (digitalRead(21) == LOW){
    estadoLEDSALA = digitalRead(SALALAMP);
    if (estadoLEDSALA == HIGH) {
      Serial.print("Desligar Lampada SALA");
      digitalWrite(SALALAMP, LOW); // Liga o LED (HIGH = nível lógico alto)
      ComandoEnviar = "POST /AcionaManual?atuador=SALALAMP&estado=OFF HTTP/1.1\r\n Host: SmartHouse \r\n Connection: close\r\n\r\n";
      Serial.print("\r\n\r\n");
      delay(2000);
      Enviado = "NÃO";
    }
    else {
      Serial.print("Ligar Lampada SALA");
      digitalWrite(SALALAMP, HIGH); // Liga o LED (HIGH = nível lógico alto)
      ComandoEnviar = "POST /AcionaManual?atuador=SALALAMP&estado=ON HTTP/1.1\r\n Host: SmartHouse \r\n Connection: close\r\n\r\n";
      Serial.print("\r\n\r\n");
      delay(1000);
      Enviado = "NÃO";
    }
  }
  if (digitalRead(20) == LOW){
    estadoLEDCOZI = digitalRead(COZILAMP);
  if (estadoLEDCOZI == HIGH) {
    Serial.print("Desligar Lampada COZI");
    digitalWrite(COZILAMP, LOW); // Liga o LED (HIGH = nível lógico alto)
    ComandoEnviar = "POST /AcionaManual?atuador=COZILAMP&estado=OFF HTTP/1.1\r\n Host: SmartHouse \r\n Connection: close\r\n\r\n";
    Serial.print("\r\n\r\n");
    Enviado = "NÃO";
  }
  else {
    Serial.print("Ligar Lampada QTD1");
    digitalWrite(COZILAMP, HIGH); // Liga o LED (HIGH = nível lógico alto)
    ComandoEnviar = "POST /AcionaManual?atuador=COZILAMP&estado=ON HTTP/1.1\r\n Host: SmartHouse \r\n Connection: close\r\n\r\n";
    Serial.print("\r\n\r\n");
    Enviado = "NÃO";
  } 
  }
  if (digitalRead(19) == LOW){
    estadoLEDQTD1 = digitalRead(QTD1LAMP);
    if (estadoLEDQTD1 == HIGH) {
      Serial.print("Desligar Lampada QTD1");
      digitalWrite(QTD1LAMP, LOW); // Liga o LED (HIGH = nível lógico alto)
      ComandoEnviar = "POST /AcionaManual?atuador=QTD1LAMP&estado=OFF HTTP/1.1\r\n Host: SmartHouse \r\n Connection: close\r\n\r\n";
      Serial.print("\r\n\r\n");
      delay(1000);
      Enviado = "NÃO";
    }
    else {
      Serial.print("Ligar Lampada QTD1");
      digitalWrite(QTD1LAMP, HIGH); // Liga o LED (HIGH = nível lógico alto)
      ComandoEnviar = "POST /AcionaManual?atuador=QTD1LAMP&estado=ON HTTP/1.1\r\n Host: SmartHouse \r\n Connection: close\r\n\r\n";
      Serial.print("\r\n\r\n");
      delay(1000);
      Enviado = "NÃO";
    } 
  }
  if (digitalRead(18) == LOW){
    estadoLEDQTD2 = digitalRead(QTD2LAMP);
      if (estadoLEDQTD2 == HIGH) {
        Serial.print("Desligar Lampada QTD2");
        digitalWrite(QTD2LAMP, LOW); // Liga o LED (HIGH = nível lógico alto)
        ComandoEnviar = "POST /AcionaManual?atuador=QTD2LAMP&estado=OFF HTTP/1.1\r\n Host: SmartHouse \r\n Connection: close\r\n\r\n";
        Serial.print("\r\n\r\n");
        Enviado = "NÃO";
      }
      else {
        Serial.print("Ligar Lampada QTD2");
        digitalWrite(QTD2LAMP, HIGH); // Liga o LED (HIGH = nível lógico alto);
        ComandoEnviar = "POST /AcionaManual?atuador=QTD2LAMP&estado=ON HTTP/1.1\r\n Host: SmartHouse \r\n Connection: close\r\n\r\n";
        Serial.print("\r\n\r\n");
        Enviado = "NÃO";
      }
  }
  if (digitalRead(47) == LOW){
    estadoLEDPOST = digitalRead(AREAEXTE);
    if (estadoLEDPOST == HIGH) {
      Serial.print("Desligar Lampada Postinhos");
      digitalWrite(AREAEXTE, LOW); // Liga o LED (HIGH = nível lógico alto);
      ComandoEnviar = "POST /AcionaManual?atuador=AREAEXTE&estado=OFF HTTP/1.1\r\n Host: SmartHouse \r\n Connection: close\r\n\r\n";
      Serial.print("\r\n\r\n");
      Enviado = "NÃO";
    }
    else {
      Serial.print("Ligar Lampada Postinhos");
      digitalWrite(AREAEXTE, HIGH); // Liga o LED (HIGH = nível lógico alto);
      ComandoEnviar = "POST /AcionaManual?atuador=AREAEXTE&estado=ON HTTP/1.1\r\n Host: SmartHouse \r\n Connection: close\r\n\r\n";
      Serial.print("\r\n\r\n");
      Enviado = "NÃO";
    } 
  }
  if (digitalRead(7) == LOW){
    estadoLEDJARD = digitalRead(JARDIMEXT);
      if (estadoLEDJARD == HIGH) {
        Serial.print("Desligar Lampada Jardim");
        digitalWrite(JARDIMEXT, LOW); // Liga o LED (HIGH = nível lógico alto);
        ComandoEnviar = "POST /AcionaManual?atuador=JARDIMEXT&estado=OFF HTTP/1.1\r\n Host: SmartHouse \r\n Connection: close\r\n\r\n";
        Serial.print("\r\n\r\n");
        Enviado = "NÃO";
      }
      else {
        Serial.print("Ligar Lampada Jardim");
        digitalWrite(JARDIMEXT, HIGH); // Liga o LED (HIGH = nível lógico alto);
        ComandoEnviar = "POST /AcionaManual?atuador=JARDIMEXT&estado=ON HTTP/1.1\r\n Host: SmartHouse \r\n Connection: close\r\n\r\n";
        Serial.print("\r\n\r\n");
        Enviado = "NÃO";
      }
  }
}

void EnviaSaida() {
  if (Enviado == "SIM") {
    Serial.print("Nada a enviar");
    Serial.print("\r\n\r\n");
  } else if (Enviado == "NÃO") {
    uint8_t buffer[1024] = {0};
    if (wifi.createTCP(HOST_NAME, HOST_PORT)) {
      Serial.print("Conexao com o Host OK!\r\n");
    } else {
      Serial.print("Conexao com o Host com ERRO!\r\n");
    }
    String POSTEstado = ComandoEnviar;
    wifi.send((const uint8_t*)POSTEstado.c_str(), strlen(POSTEstado.c_str()));

    uint32_t len = wifi.recv(buffer, sizeof(buffer), 10000);
    char *resposta = buffer;
    for (int i = 0; i < len; i++)
    {
      if (strncmp(resposta++, "\r\n\r\n", 4) == 0) break;
    }
    resposta += 3;
    tratado = resposta;
    Serial.print("\r\n\r\n");
    Enviado = "SIM";
  }
}

void conectarWifi() {
  
  wifi.setOprToStationSoftAP(); //ConfiguraÃ§Ã£o StationSoft
  wifi.joinAP(WIFI_SSID, WIFI_PSK); //Conectar ao Wifi
  wifi.disableMUX(); //Habilita somente 1 tipo de conexÃ£o
  Serial.print("IP: ");
  Serial.println(wifi.getLocalIP().c_str());
  Serial.print("\r\nSETUP Finalizado!\r\n");
}

void VerificaSaidas() {
  uint8_t buffer[1024] = {0};
  if (wifi.createTCP(HOST_NAME, HOST_PORT)) {
    Serial.print("Conexao com o Host OK!\r\n");
  } else {
    Serial.print("Conexao com o Host com ERRO!\r\n");
  }
  String ComandoGET = "GET /StatusSaidas HTTP/1.1\r\nHost: SmartHome\r\nConnection: close\r\n\r\n";
  wifi.send((const uint8_t*)ComandoGET.c_str(), strlen(ComandoGET.c_str()));

  uint32_t len = wifi.recv(buffer, sizeof(buffer), 10000);
  char *resposta = buffer;
  for (int i = 0; i < len; i++)
  {
    if (strncmp(resposta++, "\r\n\r\n", 4) == 0) break;
  }
  resposta += 3;
  tratado = resposta;
}

void Acionamento() {
  if (tratado.startsWith("ALARME,"))
  {
    if (tratado.endsWith("ON")) {
      Serial.print("\nALARME ATIVADO!\r\n\r\n");
      attachInterrupt(0, interrupcaoALARME, FALLING); //Configurando a interrupÃ§Ã£o Pino 2 (ALARME)
    }
    else {
      Serial.print("\nALARME DESATIVADO!\r\n\r\n");
      detachInterrupt(0);
      AlarmeATIVADO = 0;
      noTone(pinBuzzer);
    }
  } else if (tratado.startsWith("SALALAMP,"))
  {
    if (tratado.endsWith(" ON")) {
      digitalWrite(SALALAMP, HIGH);
      Serial.print("\nLampada da Sala acesa!\r\n\r\n");
      delay(1000);
      return;
    }
    else {
      digitalWrite(SALALAMP, LOW);
      Serial.print("\nLampada da Sala apagada!\r\n\r\n");
      delay(1000);
      return;
    }
  } else if (tratado.startsWith("COZILAMP,"))
  {
    if (tratado.endsWith(" ON")) {
      digitalWrite(COZILAMP, HIGH);
      Serial.print("\nLampada da Cozinha acesa!\r\n\r\n");
      delay(1000);
      return;
    }
    else {
      digitalWrite(COZILAMP, LOW);
      Serial.print("\nLampada da Cozinha apagada!\r\n\r\n");
      delay(1000);
      return;
    }
  } else if (tratado.startsWith("QTD1LAMP,"))
  {
    if (tratado.endsWith(" ON")) {
      digitalWrite(QTD1LAMP, HIGH);
      Serial.print("\nLampada do Quarto 1 acesa!\r\n\r\n");
      delay(1000);
      return;
    }
    else {
      digitalWrite(QTD1LAMP, LOW);
      Serial.print("\nLampada do Quarto 1 apagada!\r\n\r\n");
      delay(1000);
      return;
    }
  } else if (tratado.startsWith("QTD2LAMP,"))
  {
    if (tratado.endsWith(" ON")) {
      digitalWrite(QTD2LAMP, HIGH);
      Serial.print("\nLampada do Quarto 2 acesa!\r\n\r\n");
      delay(1000);
      return;
    }
    else {
      digitalWrite(QTD2LAMP, LOW);
      Serial.print("\nLampada do Quarto 2 apagada!\r\n\r\n");
      delay(1000);
      return;
    }
  } else if (tratado.startsWith("VENTIL,"))
  {
    if (tratado.endsWith(" ON")) {
      digitalWrite(VENTIL, HIGH);
      Serial.print("\nVentilador ligado!\r\n\r\n");
      delay(1000);
      return;
    }
    else {
      digitalWrite(VENTIL, LOW);
      Serial.print("\nVentilador desligado!\r\n\r\n");
      delay(1000);
      return;
    }
  } else if (tratado.startsWith("PORTSOCI,"))
  {
    if (tratado.endsWith(" ON")) {
      digitalWrite(PORTSOCIF, HIGH);
      digitalWrite(PORTSOCIA, LOW); 
      Serial.print("\nAbrindo portao Social!\r\n\r\n");
      delay(1000);
      digitalWrite(PORTSOCIA, HIGH);
      return;
    }
    else {
      digitalWrite(PORTSOCIA, HIGH);
      digitalWrite(PORTSOCIF, LOW);
      Serial.print("\nFechando Portao Social\r\n\r\n");
      delay(500);
      digitalWrite(PORTSOCIF, HIGH);
      return;
    }
  } else if (tratado.startsWith("PORTCARR,"))
  {
    if (tratado.endsWith(" ON")) {
      digitalWrite(PORTCARRF, HIGH);
      digitalWrite(PORTCARRA, LOW);
      Serial.print("\nAbrindo portao para o carro!\r\n\r\n");
      delay(400);
      digitalWrite(PORTCARRA, HIGH);
      return;
    }
    else {
      digitalWrite(PORTCARRA, HIGH);
      digitalWrite(PORTCARRF, LOW);
      Serial.print("\nFechando o portao para o carro!\r\n\r\n");
      delay(400);
      digitalWrite(PORTCARRF, HIGH);
      return;
    }

  } else if (tratado.startsWith("AREAEXTE,"))
  {
    if (tratado.endsWith(" ON")) {
      digitalWrite(AREAEXTE, HIGH);
      Serial.print("\nLuzes da Ã�rea Externa acesas!!\r\n\r\n");
      delay(1000);
      return;
    }
    else {
      digitalWrite(AREAEXTE, LOW);
      Serial.print("\nLuzes da Ã�rea Externa apagadas!!\r\n\r\n");
      delay(1000);
      return;
    }

  } else if (tratado.startsWith("VARANDAC,"))
  {
    if (tratado.endsWith(" ON")) {
      digitalWrite(VARANDAC, HIGH);
      Serial.print("\nLuzes da Varanda acesas!\r\n\r\n");
      delay(1000);
      return;
    }
    else {
      digitalWrite(VARANDAC, LOW);
      Serial.print("\nLuzes da Varanda apagadas!\r\n\r\n");
      delay(1000);
      return;
    }
  } else if (tratado.startsWith("JARDIMEXT,"))
  {
    if (tratado.endsWith(" ON")) {
      digitalWrite(JARDIMEXT, HIGH);
      Serial.print("\nLuzes do Jardim acesas!\r\n\r\n");
      delay(1000);
      return;
    }
    else {
      digitalWrite(JARDIMEXT, LOW);
      Serial.print("\nLuzes do Jardim apagadas!\r\n\r\n");
      delay(1000);
      return;
    }
  }
}

void EnviaTemp(){
  uint8_t buffer[1024] = {0};
  if (wifi.createTCP(HOST_NAME, HOST_PORT)) {
    Serial.print("Conexao com o Host OK!\r\n");
  } else {
    Serial.print("Conexao com o Host com ERRO!\r\n");
  }
  temp = (float(analogRead(LM35))*5/(1023))/0.01;
  String ComandoPOST = "POST /TempAtual?graus=";
  ComandoPOST += temp;
  ComandoPOST += " HTTP/1.1\r\n Host: SmartHouse \r\n Connection: close\r\n\r\n";
  wifi.send((const uint8_t*)ComandoPOST.c_str(), strlen(ComandoPOST.c_str()));

  uint32_t len = wifi.recv(buffer, sizeof(buffer), 10000);
  char *resposta = buffer;
  for (int i = 0; i < len; i++)
  {
    if (strncmp(resposta++, "\r\n\r\n", 4) == 0) break;
  }
  resposta += 3;
  tratado = resposta;
  Serial.print(tratado);
  Serial.print("\r\n");
}
