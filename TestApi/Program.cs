using ApiModels;
using Microsoft.OpenApi.Models;
using TestApi;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(x =>
{
    x.AddServer(new OpenApiServer { Url = "http://localhost:5093" });
});

builder.Services.AddCors();

var app = builder.Build();
app.UseCors(x =>
{
    x.AllowAnyHeader()
    .AllowAnyMethod()
    .AllowAnyOrigin();
});
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger(x =>
    {

    });
    app.UseSwaggerUI();
}

var instance = new EmployeeEndpoints();
app.RegisterEmployeeEndpoints(instance);

app.Run();


