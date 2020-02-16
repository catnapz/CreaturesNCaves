#!/bin/bash

# Generate Server coverage reports
dotnet test /p:CollectCoverage=true /p:CoverletOutput=TestResults/ /p:CoverletOutputFormat=\"json,cobertura,lcov\" /p:Threshold=80
mkdir -p TestResults/Server && mv Server.Tests/TestResults/* ./TestResults/Server

# Generate ClientApp coverage reports
cd ./ClientApp && npm t
mkdir -p ../TestResults/ClientApp && mv coverage/* ../TestResults/ClientApp
