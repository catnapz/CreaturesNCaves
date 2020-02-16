FROM mcr.microsoft.com/dotnet/core/runtime:3.0 AS base
WORKDIR /app

FROM mcr.microsoft.com/dotnet/core/sdk:3.0 AS build
WORKDIR /src
COPY ["Server/CreaturesNCaves.csproj", "Server/"]
RUN dotnet restore "Server/CreaturesNCaves.csproj"
COPY . .
WORKDIR "/src/Server"
RUN dotnet build "CreaturesNCaves.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "CreaturesNCaves.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "CreaturesNCaves.dll"]
