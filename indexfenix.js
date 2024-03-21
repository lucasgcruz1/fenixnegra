const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const mqtt = require('mqtt');

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

let fenixstatusluz = 'desligado';
let luzquarto = 'desligado';
let velocidade = 0;
let fenixmilhas = 'desligado';
let radio = false;
let som = false;
let fogo = 'desligado';
let extra = 'desligado';
let fenixlatitude = 0.0;
let fenixlongitude = 0.0;

// Configurações do broker MQTT
const mqttBroker = 'mqtt://18.231.150.254';
const mqttTopic = 'fenixnegra';

// Cria um cliente MQTT
const client = mqtt.connect(mqttBroker);

// Função para publicar mensagens MQTT
function publishToMqtt(message) {
  client.publish(mqttTopic, message);
}

// Função para processar as mensagens MQTT recebidas
function processMqttMessage(message) {
  if (message === 'l1') {
    fenixstatusluz = 'ligado';
  } else if (message === 'l2') {
    fenixstatusluz = 'desligado';
  }
  if (message === 'm1') {
    fenixmilhas = 'ligado';
  } else if (message === 'm2') {
    fenixmilhas = 'desligado';
  }
  if (message === 'f1') {
    fogo = 'ligado';
  } else if (message === 'f2') {
    fogo = 'desligado';
  }
  if (message === 'e1') {
    extra = 'ligado';
  } else if (message === 'e2') {
    extra = 'desligado';
  }
  if (message === 'q1') {
    luzquarto = 'ligado';
  } else if (message === 'q2') {
    luzquarto = 'desligado';
  }
  

  // Aqui você pode adicionar qualquer lógica adicional que desejar
}

// Assina o tópico MQTT para receber mensagens
client.on('connect', () => {
  client.subscribe(mqttTopic);
});

// Processa as mensagens MQTT recebidas
client.on('message', (topic, message) => {
  processMqttMessage(message.toString());
});

app.get('/fenixstatusluz', (req, res) => {
  res.send(fenixstatusluz);
});

app.post('/fenixstatusluz', (req, res) => {
  fenixstatusluz = (fenixstatusluz === 'desligado') ? 'ligado' : 'desligado';

  // Envia a mensagem MQTT com base no valor atualizado de fenixstatusluz
  if (fenixstatusluz === 'ligado') {
    publishToMqtt('l1');
  } else {
    publishToMqtt('l2');
  }

  res.send(fenixstatusluz);
});

app.get('/luzquarto', (req, res) => {
  res.send(luzquarto);
});

app.post('/luzquarto', (req, res) => {
  luzquarto = (luzquarto === 'desligado') ? 'ligado' : 'desligado';

  // Envia a mensagem MQTT com base no valor atualizado de luzquarto
  if (luzquarto === 'ligado') {
    publishToMqtt('q1');
  } else {
    publishToMqtt('q2');
  }

  res.send(luzquarto);
});

app.get('/fenixmilhas', (req, res) => {
    res.send(fenixmilhas);
  });
  
  app.post('/fenixmilhas', (req, res) => {
    fenixmilhas = (fenixmilhas === 'desligado') ? 'ligado' : 'desligado';
  
    // Envia a mensagem MQTT com base no valor atualizado de fenixstatusluz
    if (fenixmilhas === 'ligado') {
      publishToMqtt('m1');
    } else {
      publishToMqtt('m2');
    }
  
    res.send(fenixmilhas);
  });


  app.get('/fogo', (req, res) => {
    res.send(fogo);
  });
  
  app.post('/fogo', (req, res) => {
    fogo = (fogo === 'desligado') ? 'ligado' : 'desligado';
  
    // Envia a mensagem MQTT com base no valor atualizado de fenixstatusluz
    if (fogo === 'ligado') {
      publishToMqtt('f1');
    } else {
      publishToMqtt('f2');
    }
  
    res.send(fogo);
  });

  app.get('/extra', (req, res) => {
    res.send(extra);
  });
  
  app.post('/extra', (req, res) => {
    extra = (extra === 'desligado') ? 'ligado' : 'desligado';
  
    // Envia a mensagem MQTT com base no valor atualizado de fenixstatusluz
    if (extra === 'ligado') {
      publishToMqtt('e1');
    } else {
      publishToMqtt('e2');
    }
  
    res.send(extra);
  });

 
 
  app.get('/fenixlatitude', (req, res) => {
    res.send(fenixlatitude.toString());
  });

  

  // Função para processar as mensagens MQTT recebidas
function processMqttMessage(message) {
  if (message === 'l1') {
    fenixstatusluz = 'ligado';
  } else if (message === 'l2') {
    fenixstatusluz = 'desligado';
  }
  if (message === 'm1') {
    fenixmilhas = 'ligado';
  } else if (message === 'm2') {
    fenixmilhas = 'desligado';
  }
  if (message === 'f1') {
    fogo = 'ligado';
  } else if (message === 'f2') {
    fogo = 'desligado';
  }
  if (message === 'e1') {
    extra = 'ligado';
  } else if (message === 'e2') {
    extra = 'desligado';
  }
  if (message === 'q1') {
    luzquarto = 'ligado';
  } else if (message === 'q2') {
    luzquarto = 'desligado';
  }











  if (message.startsWith('lat=')) {
    const numbers = message.match(/-?\d+\.\d+/g);
    if (numbers && numbers.length > 0) {
      fenixlatitude = parseFloat(numbers[0]);
      console.log(fenixlatitude);
    }
  }

  if (message.startsWith('long=')) {
    const numbers = message.match(/-?\d+\.\d+/g);
    if (numbers && numbers.length > 0) {
      fenixlongitude = parseFloat(numbers[0]);
      console.log(fenixlongitude);
    }
  }
}

app.get('/fenixlongitude', (req, res) => {
    res.send(fenixlongitude.toString());
  });

   // Função para processar as mensagens MQTT recebidas

    

// Resto do seu código...

app.listen(3001, () => {
  console.log('A API está rodando na porta 3001.');
});
