# == Base ==
FROM mcr.microsoft.com/dotnet/core/aspnet:3.1 AS base
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

# Install nodejs
ENV NVM_DIR /usr/local/nvm
# TODO: figure out how to get lts version
ENV NODE_VERSION 12.16.0

WORKDIR $NVM_DIR

RUN curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash \
    && . $NVM_DIR/nvm.sh \
    && nvm install $NODE_VERSION \
    && nvm alias default $NODE_VERSION \
    && nvm use default

ENV NODE_PATH $NVM_DIR/versions/node/v$NODE_VERSION/lib/node_modules
ENV PATH      $NVM_DIR/versions/node/v$NODE_VERSION/bin:$PATH

WORKDIR /ClientApp
COPY --from=node-test-env /ClientApp ./

# Copy over source files
WORKDIR /Server
COPY ./Server ./
WORKDIR /Server.Tests
COPY ./Server.Tests ./
# Install dependencies
RUN dotnet restore
# Copy over source files
# Run unit test
RUN dotnet test Server.Tests.csproj "/p:CollectCoverage=true" "/p:CoverletOutput=TestResults/" "/p:CoverletOutputFormat=\"json,cobertura,lcov\"" "/p:Threshold=0"
# TODO: Figure out how to extract coverage reports in CI pipeline


# == Server Release Build ==
FROM dotnet-test-env AS dotnet-build-env
WORKDIR /Server
# Install dependencies
RUN dotnet restore
# Build Release
RUN dotnet build "CreaturesNCaves.csproj" -c Release -o ./Build


# == Server Production Publish ==
FROM dotnet-build-env as dotnet-publish-env

WORKDIR /ClientApp
ENV NODE_ENV production
RUN npm install --production
RUN npm rebuild node-sass

WORKDIR /Server
# Publish Release
RUN dotnet publish "CreaturesNCaves.csproj" -c Release -o ./Publish


# == Creatures & Caves ==
FROM base AS final
EXPOSE 80
WORKDIR /app/ClientApp
COPY --from=dotnet-publish-env /ClientApp/build ./
WORKDIR /app/Server
COPY --from=dotnet-publish-env /Server/Publish ./
ENTRYPOINT [ "dotnet", "CreaturesNCaves.dll" ]
