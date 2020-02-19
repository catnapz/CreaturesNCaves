![Creatures & Caves Master Pipeline](https://github.com/ansh-projects/CreaturesNCaves/workflows/Creatures%20&%20Caves%20Master%20Pipeline/badge.svg?branch=master)

[![codecov](https://codecov.io/gh/ansh-projects/CreaturesNCaves/branch/master/graph/badge.svg)](https://codecov.io/gh/ansh-projects/CreaturesNCaves)

# DEVELOPMENT NOTES
## PRE-REQS
* Install dotnet aspnet runtime, dotnet runtime, and dotnet sdk (currently version 3.1) [Download](https://dotnet.microsoft.com/download)
* Node lts (currently 12.16.0) [Download](https://nodejs.org/en/download/)

## BUILD INSTRUCTIONS
* Run ```npm install``` in the ClientApp dir to install node dependancies
* Run ```dotnet watch run``` in the Server dir to run app in watch mode. This starts up the server and client app, both will refresh on code changes.
* To build a production build of the app, you can use the convenience bash script ```buildProd.sh``` or run the following steps
    * Delete the node_modules folder in ClientApp
    * Run ```dotnet publish Server/CreaturesNCaves.csproj -c Release -o ./dist/Server``` from the App's root folder
    * Create a folder named ClientApp in the created dist folder and copy over the contents in the ClientApp/build folder into there

## RUN INSTRUCTIONS
* To run the app, use ```dotnet run --project Server/CreaturesNCaves.csproj``` from the root directory or ```dotnet run``` from the Server directory
* To run the app in watch mode, use ```dotnet watch run``` from the Server directory.

## TEST INSTRUCTIONS
* To run server tests use ```dotnet run test```
* To run server tests and generate coverage reports use ```dotnet test /p:CollectCoverage=true /p:CoverletOutput=TestResults/ /p:CoverletOutputFormat=\"json,cobertura,lcov\" /p:Threshold=80```
* To run client tests, use ```npm test``` in the ClientApp directory
* There is also a convenience bash script ```generateCoverageReports.sh``` that will run unit tests and place the coverage reports in the TestResults directory

---

# Creatures & Caves
A tool for DMs

## Server
Written in C# (```.cs```) with dotnet core

## Client
Client is written in Typescript (```.ts```) and React Typescript (```.tsx```). Uses Redux for state management
