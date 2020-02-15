FROM mcr.microsoft.com/dotnet/core/runtime:3.0 AS base
WORKDIR /app

FROM mcr.microsoft.com/dotnet/core/sdk:3.0 AS build
WORKDIR /src
COPY ["Server.Tests/Server.Tests.csproj", "Server.Tests/"]
RUN dotnet restore "Server.Tests/Server.Tests.csproj"
COPY . .
WORKDIR "/src/Server.Tests"
RUN dotnet build "Server.Tests.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "Server.Tests.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Server.Tests.dll"]
