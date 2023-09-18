var grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');
const { struct } = require('pb-util');

PROTO_PATH = path.resolve(__dirname, './protos/data.proto');
const protoObject = protoLoader.loadSync(PROTO_PATH);

const MessageServiceDef = grpc.loadPackageDefinition(protoObject);

const client = new MessageServiceDef.MessageSender('server:4001', grpc.credentials.createInsecure())

const payload = {
    data: struct.encode({
        name: 'John Paul',
        age: 25,
        isDev: true
    })
}

// Sending message
client.SendData(payload, (err, response) => {
    if (err) throw err
    console.log(response)
})

