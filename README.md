# DEVELOPMENT NOTES
* Run ```npm install``` in the /ClientApp dir to install node dependancies
* Run ```dotnet watch run``` to run app in watch mode. This starts up the server and client app, both will refresh on code changes.

---

# Creatures & Caves
A tool for DMs

## Server
Written in C# with dotnet core
To run tests use ```dotnet run test```
To run tests and generate coverage reports use ```dotnet test /p:CollectCoverage=true /p:CoverletOutput=TestResults/ /p:CoverletOutputFormat=json```

## Client
Client is written in Typescript (```.ts```) and React Typescript (```.tsx```). Uses Redux for state management
