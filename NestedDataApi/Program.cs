using ApiModels;
using Microsoft.AspNetCore.Mvc;
using NestedDataApi;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.MapGet("/employees", () =>
{
    var employees = Enumerable.Range(1, 5).Select(index =>
        new Employee
        (
            $"{index}",
            $"Name {index}",
            100 * index,
            DateTime.Now,
            index % 2 == 0
        ))
        .ToList();
    return new PagedApiResponse<Employee>
    {
        Data = employees,
        PageNumber = 1,
        PageSize = 10,
        TotalCount = 100
    };
})
.WithName("GetEmployees")
.WithOpenApi();

app.MapGet("/employees/{id}", (string id) =>
{
    return new ApiResponse<Employee>
    {
        Data = new Employee
        (
            id,
            $"Name {id}",
            100,
            DateTime.Now,
            new Random().Next() % 2 == 0
        )
    };
})
.WithName("GetEmployeeById")
.WithOpenApi();

app.MapPut("/employees/{id}", (string id, [FromBody] Employee employee) =>
{
    return new ApiResponse<Employee> { Data = employee };
})
.WithName("UpdateEmployee")
.WithOpenApi();

app.MapDelete("/employees/{id}", (string id) =>
{
    return;
})
.WithName("DeleteEmployee")
.WithOpenApi();


app.Run();
