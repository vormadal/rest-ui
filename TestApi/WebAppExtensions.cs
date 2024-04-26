using ApiModels;
using Microsoft.AspNetCore.Mvc;

namespace TestApi
{
    public static class WebAppExtensions
    {
        public static void RegisterEmployeeEndpoints(this WebApplication app, EmployeeEndpoints instance)
        {
            app.MapGet("/employees", instance.GetEmployeeList)
                .WithName("GetEmployees")
                .WithOpenApi();

            app.MapGet("/employees/{id}", instance.GetEmployeeById)
                .WithName("GetEmployeeById")
                .WithOpenApi();

            app.MapPut("/employees/{id}", instance.UpdateEmployee)
            .WithName("UpdateEmployee")
            .WithOpenApi();

            app.MapDelete("/employees/{id}", instance.DeleteEmployee)
            .WithName("DeleteEmployee")
            .WithOpenApi();
        }
    }
}
