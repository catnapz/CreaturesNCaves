#!/bin/bash

# Clean dist folder
rm -rf ./dist

# Build Server
dotnet build Server/CreaturesNCaves.csproj -c Release -o ./dist/Server

# Build ClientApp
mkdir -p ./dist/ClientApp
cd ./ClientApp
npm run build
mkdir -p ./dist/ClientApp
mv build ../dist/ClientApp