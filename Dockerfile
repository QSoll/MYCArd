# Etapa base para runtime
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS base
WORKDIR /app
EXPOSE 80

# Etapa de build
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
WORKDIR /src

# Copia os arquivos do projeto
COPY . .

# ✅ Faz o ASP.NET escutar em todas as interfaces
ENV ASPNETCORE_URLS=http://+:80

# Publica o projeto com arquivos estáticos
RUN dotnet publish "MyCArd.csproj" -c Release -o /app/publish

# Etapa final
FROM base AS final
WORKDIR /app

# Copia os arquivos publicados
COPY --from=build /app/publish .

# Executa o app
ENTRYPOINT ["dotnet", "MyCArd.dll"]
