var grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const { timeout } = require('async');
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

var timeoutsec = new Date().setSeconds(new Date().getSeconds() + 3)

// Sending message
client.SendData(payload, { deadline: timeoutsec }, (err, response) => {
    if (err) throw err
    console.log(response)
})

