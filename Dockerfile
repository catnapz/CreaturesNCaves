# == Base ==
FROM mcr.microsoft.com/dotnet/core/runtime:3.1 AS base
WORKDIR /app


# == ClientApp Tests ==
FROM node:lts-alpine AS node-test-env
WORKDIR /ClientApp
# Install dependencies
COPY ["./ClientApp/package.json", "./ClientApp/package-lock.json*", "./"]
RUN npm install
# Copy over source files
COPY ./ClientApp ./
# Run unit tests
RUN npm test
# TODO: Figure out how to extract coverage reports in CI pipeline


# == Server.Tests ==
FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS dotnet-test-env
WORKDIR /Server
# Install Server dependencies
COPY Server/CreaturesNCaves.csproj ./
# Copy over source files
COPY ./Server ./
# Install Server.Tests dependencies
WORKDIR /Server.Tests
COPY Server.Tests/Server.Tests.csproj ./
RUN dotnet restore
# Copy over source files
COPY ./Server.Tests ./
# Run unit test
RUN ["dotnet", "test", "/p:CollectCoverage=true", "/p:CoverletOutput=TestResults/", "/p:CoverletOutputFormat=\"json,cobertura,lcov\"", "/p:Threshold=80"
# TODO: Figure out how to extract coverage reports in CI pipeline


# == ClientApp Production Build ==
FROM node-test-env as node-build-env
WORKDIR /ClientApp
# Build production
RUN npm run build


# == Server Release Build ==
FROM dotnet-test-env AS dotnet-build-env
WORKDIR /Server
# Install dependencies
RUN dotnet restore
# Build Release
RUN dotnet build "Server.Tests.csproj" -c Release -o ./Build


# == Server Production Publish ==
FROM dotnet-build-env as dotnet-publish-env
WORKDIR /Server
# Publish Release
RUN dotnet publish "Server.Tests.csproj" -c Release -o ./Publish


# == Creatures & Caves ==
FROM base AS final
WORKDIR /app/ClientApp
COPY --from=node-build-env /ClientApp/build ./
WORKDIR /app/Server
COPY --from=dotnet-publish-env /Server/Publish ./
ENTRYPOINT [ "dotnet", "CreaturesNCaves.dll" ]
