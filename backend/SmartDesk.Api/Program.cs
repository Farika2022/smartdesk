// WHY WebApplication.CreateBuilder?
// This sets up everything .NET needs to run:
// dependency injection, configuration, logging.
// builder = the setup phase. app = the running phase.
var builder = WebApplication.CreateBuilder(args);

// WHY AddControllers?
// Tells .NET: I have controller classes. Find them and wire them up.
// Without this, TicketsController is never discovered.
builder.Services.AddControllers();

// WHY CORS?
// React runs on localhost:5173. .NET runs on localhost:5056.
// Browsers block requests between different ports by default.
// CORS tells the browser: it is safe to allow React to call this API.
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReact", policy =>
    {
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

var app = builder.Build();

// WHY UseCors before MapControllers?
// Middleware runs in order. CORS must be checked before
// the request reaches the controller. Order matters in .NET.
app.UseCors("AllowReact");

// WHY MapControllers?
// Connects the URL routes to the controller methods.
// GET /api/tickets → TicketsController.GetAll()
// Without this, the endpoints never get registered.
app.MapControllers();

app.Run();