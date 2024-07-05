import path from "path";
import * as grpc from "@grpc/grpc-js";
import { GrpcObject, ServiceClientConstructor } from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader"

const packageDefinition = protoLoader.loadSync(path.join(__dirname, '../src/a.proto'));
const personProto = grpc.loadPackageDefinition(packageDefinition);


const PERSONS : any[] = [
    { name: 'Alice', age: 25 },
    { name: 'Bob', age: 30 },
    { name: 'Charlie', age: 28 },
];


//@ts-ignore
function addPerson(call, callback) {   //call => req and callback => res.json
      let person = {
        name: call.request.name,
        age: call.request.age
      }
      PERSONS.push(person);
      callback(null, person)       // first arg is Error
}

//@ts-ignore
function getPersonByName(call , callback){
    const name = call.request.name;
    const person = PERSONS.find(x => x.name === name);
    callback(null , person);
}
  
  
const server = new grpc.Server();

server.addService((personProto.AddressBookService as ServiceClientConstructor).service, { 
    addPerson: addPerson , 
    getPersonByName: getPersonByName 
});

server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
    server.start();
});

console.log('Server started on port 50051');