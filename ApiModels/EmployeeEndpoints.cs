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

    public PagedApiResponse<Employee> GetEmployeeList(int pageNumber = 0, int pageSize = 10)
    {
        return new PagedApiResponse<Employee>
        {
            PageNumber = pageNumber,
            PageSize = pageSize,
            TotalCount = 1000,
            Data = Enumerable.Range(pageNumber * pageSize, pageSize).Select(index =>
                new Employee
                (
                    $"{index}",
                    $"Name {index}",
                    100 * index,
                    DateTime.Now,
                    index % 2 == 0
                ))
                .ToList(),

        };
    }
}
