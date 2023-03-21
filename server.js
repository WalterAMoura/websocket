const instance = require('./parseIso8583');
const net = require('net');


const server = net.createServer((socket) => {
    console.log('Cliente conectado!');

    socket.on('data', (data) => {
        console.log('Dados recebidos do cliente:');
        console.log(data.toString());
        
        const fieldsArray = instance.parseIso8583_v2(data.toString());

        console.log("[Purchase Response]");

        for (const field of fieldsArray) {
            const key = field.field;
            const name = field.name;
            const value = field.value;
            const length = field.length;
            const pad = 100-(name.length + key.length);
            const paddedValue = value.padStart(pad + 1,".");

            console.log(` ${name} [${key}]${paddedValue}`);
        }

        // Para enviar uma resposta para o cliente, basta utilizar o método "write" do socket:
        socket.write('Mensagem recebida com sucesso!\n');
    });

    socket.on('end', () => {
        console.log('Cliente desconectado!');
    });
});

server.on('error', (err) => {
    throw err;
});

server.listen(3000, () => {
    console.log('Servidor socket iniciado na porta 3000!');
});