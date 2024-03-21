const mqtt = require('mqtt');
const express = require('express');
const app = express();

// Configurações do servidor MQTT
const mqttBroker = 'mqtt://localhost'; // Altere para o endereço do seu servidor MQTT
const mqttTopic = 'test';

// Cria um cliente MQTT
const client = mqtt.connect(mqttBroker);

// Assina o tópico MQTT
client.on('connect', () => {
  client.subscribe(mqttTopic);
});

// Recebe mensagens MQTT
client.on('message', (topic, message) => {
  console.log(`Received message on topic ${topic}: ${message.toString()}`);
});

// Rota de exemplo para publicar uma mensagem MQTT
app.get('/publish', (req, res) => {
  const message = 'Hello, MQTT!';
  client.publish(mqttTopic, message);
  res.send(`Published message: ${message}`);
});

// Inicia o servidor HTTP na porta 3000
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
