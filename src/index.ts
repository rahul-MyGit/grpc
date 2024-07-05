import path from "path";
import * as grpc from "@grpc/grpc-js";
import { GrpcObject, ServiceClientConstructor } from "@grpc/grpc-js";     // Not using
import * as protoLoader from "@grpc/proto-loader"
import { ProtoGrpcType } from "./generated/a";
import { Status } from "@grpc/grpc-js/build/src/constants";

const packageDefinition = protoLoader.loadSync(path.join(__dirname, '../src/a.proto'));
const personProto = grpc.loadPackageDefinition(packageDefinition) as unknown as ProtoGrpcType;


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
    let person = PERSONS.find(x => x.name === name);
    if(person){
        callback(null , person);
    } else{
        callback({
            code: Status.NOT_FOUND,
            details: "not found"
        }, null);
    }
}
  
  
const server = new grpc.Server();

server.addService((personProto.AddressBookService).service, { 
    addPerson: addPerson , 
    getPersonByName: getPersonByName 
});

server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
    server.start();
});

console.log('Server started on port 50051');