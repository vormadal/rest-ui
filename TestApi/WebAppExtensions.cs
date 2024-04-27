using ApiModels;

namespace TestApi;

public static class WebAppExtensions
{
    public static void RegisterEmployeeEndpoints(this WebApplication app, EmployeeEndpoints instance)
    {
        var group = app.MapGroup("/employees").WithOpenApi();

        group.MapPost("/", instance.CreateEmployee);
        group.MapGet("/", instance.GetEmployeeList);
        group.MapGet("/{id}", instance.GetEmployeeById);
        group.MapPut("/{id}", instance.UpdateEmployee);
        group.MapDelete("/{id}", instance.DeleteEmployee);
    }

    public static void RegisterDepartmentEndpoints(this WebApplication app, DepartmentEndpoints instance)
    {
        var group = app.MapGroup("/departments").WithOpenApi();

        group.MapPost("/", instance.CreateDepartment);
        group.MapGet("/", instance.GetDepartmentList);
        group.MapGet("/{id}", instance.GetDepartmentById);
        group.MapPut("/{id}", instance.UpdateDepartment);
        group.MapDelete("/{id}", instance.DeleteDepartment);
    }
}
