using System;

namespace ApiModels;

public class Employee(
string Id,
string Employee_name,
int Employee_salary,
DateTime Created,
bool IsAdmin)
{
    public string Id { get; } = Id;
    public string Employee_Name { get; } = Employee_name;
    public int Employee_Salary { get; } = Employee_salary;
    public DateTime Created { get; } = Created;
    public bool IsAdmin { get; } = IsAdmin;

    public static List<Employee> CreateSamples(int size)
    {
        return Enumerable
            .Range(1, size)
            .Select(index => new Employee
            (
                $"{index}",
                $"Name {index}",
                100 * index,
                DateTime.Now,
                index % 2 == 0
                )
            ).ToList();
    }
}
