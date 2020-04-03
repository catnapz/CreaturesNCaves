[![Build Pipeline](https://github.com/catnapz/CreaturesNCaves/workflows/Build%20Pipeline/badge.svg)](https://github.com/catnapz/CreaturesNCaves/actions?query=workflow%3A%22Build+Pipeline%22)

[![codecov](https://codecov.io/gh/catnapz/CreaturesNCaves/branch/master/graph/badge.svg)](https://codecov.io/gh/catnapz/CreaturesNCaves)

# Creatures & Caves
A tool for DMs

# DEVELOPMENT NOTES

##### Recommended Tools
* pgAdmin4
* Rider or Visual Studio
* Visual Studio Code
* Coffee

## PRE-REQS
* Install dotnet aspnet runtime, dotnet runtime, and dotnet sdk (currently version 3.1) - [Download](https://dotnet.microsoft.com/download)
* Node lts (currently 12.16.0) - [Download](https://nodejs.org/en/download/)

## APPSETTINGS
Create a file named `appsettings.Development.json` in the same directory as `appsettings.json` with the following:
```json
{
    "Logging": {
        "LogLevel": {
            "Default": "Debug",
            "System": "Information",
            "Microsoft": "Information"
        }
    },
    "ConnectionStrings": {
        "DBConnectionString": "Host=localhost;Port=<PORT>;Username=cnc_admin;Password=<PASSWORD>;Database=cnc;"
    },
    "IdentityServer": {
        "Key": {
            "Type": "Development"
        }
    }
}
```
> DBConnectionString: \
> \<PORT\> = the port of your postgres server. See instructions under the [DATABASE](#DATABASE) instructions \
> \<PASSWORD\> = the password you set for the cnc_admin psql user. See instructions under the [DATABASE](#DATABASE) instructions

## DATABASE
Follow instructuons [here](/EntityFramework/Database/README.md)

## DOCKER
* To build the docker image, run ```docker build -t cnc:latest .``` in the same directory as the `Dockerfile` file.
* To run the image in a container, run ```docker run -it -p 8080:80 cnc:latest```. The app can now be accessed from [localhost:8080](http://localhost:8080)
* To get into the running container, you can run ```docker exec -it <container id> bash```
* You can retrieve the `container id` by running ```docker ps```

## BUILD INSTRUCTIONS
* Run ```npm install``` in the ClientApp dir to install node dependancies
* Run ```dotnet restore``` in the root dir to install dotnet dependancies
* Run ```dotnet build``` in the root dir to build the backend services
* To build a production build of the app
    * Delete the node_modules folder in ClientApp
    * Run ```dotnet publish -c Release -o ./dist``` from the App's root folder
    * Create a folder named ClientApp in the created dist folder and copy over the contents in the ClientApp/build folder into there

## RUN INSTRUCTIONS
* To run the app, use ```dotnet run --project Server/Server.csproj``` from the root directory or ```dotnet run``` from the Server directory
* Similarly, to run the app in watch mode, use ```dotnet watch --project Server/Server.csproj run```.

## TEST INSTRUCTIONS
* To run backend tests run ```dotnet run test``` in the root directory
* To run client tests, run ```npm test``` in the ClientApp directory

> Below is no longer valid until updated
```
* To run server tests and generate coverage reports use ```dotnet test /p:CollectCoverage=true /p:CoverletOutput=TestResults/ /p:CoverletOutputFormat=\"lcov\" /p:Threshold=80```
* There is also a convenience bash script ```generateCoverageReports.sh``` that will run unit tests and place the coverage reports in the TestResults directory
```
## Server
Written in C# (`.cs`) with dotnet core

## Client
Client is written in Typescript (`.ts`) and React Typescript (`.tsx`). Uses Redux for state management

## Making Commits
* Add `[skip-ci]` in your commit message to skip ci
