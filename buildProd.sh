#!/bin/bash

# Clean up
rm -rf ./dist
rm -rf ./node_modules

# Build Server and ClientApp
dotnet publish Server/Server.csproj -c Release -o ./dist/Server
mkdir -p ./dist/ClientApp
mv ./ClientApp/build/* ./dist/ClientApp
