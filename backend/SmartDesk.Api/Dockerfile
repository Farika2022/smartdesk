# Stage 1 — build
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /app

# Copy the project file from the correct path
COPY backend/SmartDesk.Api/*.csproj ./
RUN dotnet restore

# Copy everything else
COPY backend/SmartDesk.Api/. ./
RUN dotnet publish -c Release -o /app/publish

# Stage 2 — runtime
FROM mcr.microsoft.com/dotnet/aspnet:10.0
WORKDIR /app
COPY --from=build /app/publish .

# WHY ARG before ENV?
# ARG declares the variable exists so Docker does not throw UndefinedVar.
# ENV then uses it at runtime.
ARG PORT=8080
ENV ASPNETCORE_URLS=http://+:${PORT}

ENTRYPOINT ["dotnet", "SmartDesk.Api.dll"]