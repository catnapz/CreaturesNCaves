#!/bin/bash
dotnet build Server/CreaturesNCaves.csproj -c Release -o ./dist/Server
mkdir -p ./dist/ClientApp
cd ./ClientApp
npm run build
mkdir -p ./dist/ClientApp
mv build ../dist/ClientApp