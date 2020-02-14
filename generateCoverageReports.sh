#!/bin/bash

dotnet test /p:CollectCoverage=true /p:CoverletOutput=TestResults/ /p:CoverletOutputFormat=\"json,cobertura,lcov\" /p:Threshold=80
cd ./ClientApp && npm t
