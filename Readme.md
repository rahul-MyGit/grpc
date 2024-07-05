# Creating the grpc in node

## To run the program

- Install dependencies

```
npm i
```

- Compile TypeScript

```
tsc -b
```

-Run Node Process

```
node dist/index.js
```

## import a.proto file in PostMan and hit addPersons or getPersonByName rpc

### Ref

- Types are imported from @grpc/proto-loader docs  

```
./node_modules/@grpc/proto-loader/build/bin/proto-loader-gen-types.js  --longs=String --enums=String --defaults --oneofs --grpcLib=@grpc/grpc-js --outDir=generated <WRITE YOUR PROTO FILE NAME>
```

If required move the generated folder to ./src/
