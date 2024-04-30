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

    public string DepartmentId { get; } = Id;

    public static List<Employee> CreateSamples(int size) => Enumerable.Range(1, size).Select(CreateSample).ToList();
    public static Employee CreateSample(int id)
    {
        return new Employee(
            $"{id}",
            $"Name {id}",
            100 * id,
            DateTime.Now,
            id % 2 == 0
            );
    }
}
