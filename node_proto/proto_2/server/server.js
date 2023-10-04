var grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');
const { struct } = require('pb-util');

PROTO_PATH = path.resolve(__dirname, './protos/data.proto');

const protoObject = protoLoader.loadSync(PROTO_PATH);
// console.log(protoObject);

const MessageServiceDef = grpc.loadPackageDefinition(protoObject);


function SendData(call, callback) {
    const data = struct.decode(call.request.data);

    console.log("Message from Client:", data);
    setTimeout(() => {
        callback(null, {})
    }, 5000);
}


const server = new grpc.Server()
server.addService(MessageServiceDef.MessageSender.service, { SendData });

server.bindAsync('0.0.0.0:4001', grpc.ServerCredentials.createInsecure(), () => {
    console.log("Server Starting!");
    server.start();
});
// console.log('Listening');

// function getServer() {
//     var server = new grpc.Server();
//     server.addService(routeguide.RouteGuide.service, {
//         getFeature: getFeature,
//         listFeatures: listFeatures,
//         recordRoute: recordRoute,
//         routeChat: routeChat
//     });
//     return server;
// }

// if (require.main === module) {
//     // If this is run as a script, start a server on an unused port
//     var routeServer = getServer();
//     routeServer.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
//         var argv = parseArgs(process.argv, {
//             string: 'db_path'
//         });
//         fs.readFile(path.resolve(argv.db_path), function (err, data) {
//             if (err) throw err;
//             feature_list = JSON.parse(data);
//             routeServer.start();
//         });
//     });
// }

// exports.getServer = getServer;