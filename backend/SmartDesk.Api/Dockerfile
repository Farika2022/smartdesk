# Stage 1 (build): includes the full .NET SDK — large, only needed to compile
# Stage 2 (runtime): includes only the runtime — small, what actually runs
# Result: the deployed image is much smaller and faster to start

# Stage 1 — build
FROM mcr.microsoft.com/dotnet/sdk:10.0 AS build
WORKDIR /app
COPY *.csproj .
RUN dotnet restore
COPY . .
RUN dotnet publish -c Release -o out

# Stage 2 — runtime only
FROM mcr.microsoft.com/dotnet/aspnet:10.0
WORKDIR /app
COPY --from=build /app/out .

# WHY PORT environment variable?
# Railway assigns a random port. We must listen on it.
# This tells .NET to use whatever port Railway provides.
ENV ASPNETCORE_URLS=http://+:$PORT

ENTRYPOINT ["dotnet", "SmartDesk.Api.dll"]