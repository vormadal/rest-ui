using System.Web.Http;

namespace ApiModels;

public class EmployeeEndpoints
{

    public Employee GetEmployeeById(string id)
    {
        return Employee.CreateSamples(1).Single();
    }

    public Employee CreateEmployee([FromBody] Employee employee)
    {
        return employee;
    }

    public void DeleteEmployee(string id)
    {

    }

    public Employee UpdateEmployee(string id, [FromBody] Employee employee)
    {
        return employee;
    }

    public List<Employee> GetEmployeeList()
    {
        return Enumerable.Range(1, 5).Select(index =>
                new Employee
                (
                    $"{index}",
                    $"Name {index}",
                    100 * index,
                    DateTime.Now,
                    index % 2 == 0
                ))
                .ToList();
    }
}
