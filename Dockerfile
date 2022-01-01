# == Base ==
FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app


# == ClientApp Tests ==
FROM node:lts AS node-test-env
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
FROM mcr.microsoft.com/dotnet/sdk:6.0 AS dotnet-test-env
WORKDIR /
COPY ./EntityFramework ./EntityFramework
COPY ./EntityFramework.Tests ./EntityFramework.Tests
COPY ./Server ./Server
COPY ./Server.Tests ./Server.Tests
COPY ./CreaturesNCaves.sln .
RUN rm -r ./EntityFramework/Database
RUN dotnet test "/p:CollectCoverage=true" "/p:CoverletOutput=TestResults/" "/p:CoverletOutputFormat=\"opencover\"" "/p:Threshold=0"


# == Server Release Build ==
FROM dotnet-test-env AS dotnet-build-env
WORKDIR /
# Install dependencies
RUN dotnet restore
# Build Release
RUN dotnet build -c Release -o ./Build


# == Server Production Publish ==
FROM dotnet-build-env as dotnet-publish-env
WORKDIR /
# Publish Release
RUN dotnet publish -c Release -o ./dist/Server


# == Client Production Build
FROM node-test-env as node-build-env
ENV NODE_ENV=production
WORKDIR /ClientApp
RUN npm run build


# == Creatures & Caves ==
FROM base AS final
WORKDIR /app/ClientApp
COPY --from=node-build-env ClientApp/build ./build
WORKDIR /app/Server
COPY --from=dotnet-publish-env /dist/Server ./
HEALTHCHECK --interval=5s --timeout=3s CMD curl --fail http://localhost/health || exit 1
ENTRYPOINT [ "dotnet", "Server.dll" ]
