const mqtt = require('mqtt');

// Configurações do broker MQTT (substitua pelos dados corretos)
const broker = 'mqtt://endereco_do_broker'; // Por exemplo, 'mqtt://mqtt.example.com'
const options = {
  port: 1883, // Porta padrão para conexões MQTT
  clientId: 'mqtt_server', // Identificador único do cliente MQTT
};

// Criação do cliente MQTT
const client = mqtt.connect(broker, options);

// Evento chamado quando o cliente MQTT se conecta ao broker
client.on('connect', () => {
  console.log('Conectado ao broker MQTT');
  client.subscribe('zeus'); // Inscreve-se no tópico "luz"
  client.subscribe('fenixnegra');
});

// Evento chamado quando uma nova mensagem é recebida em um tópico inscrito
client.on('message', (topic, message) => {
  console.log(`Nova mensagem recebida no tópico ${topic}: ${message.toString()}`);
});

