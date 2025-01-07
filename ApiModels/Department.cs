namespace ApiModels;

public record Department(
string Id,
string Department_name,
bool IsDeleted,
string[] Tags,
Employee[] Employees,
decimal Budget,
int EmployeeCount,
DateTime Created
)
{
    public static List<Department> CreateSamples(int size)
    {
        return Enumerable
            .Range(1, size)
            .Select(CreateSample)
            .ToList();
    }

    public static Department CreateSample(int id) => CreateSample($"{id}");
    public static Department CreateSample(string id)
    {
        return new Department($"{id}", $"Name {id}", true, ["tag-1", "tag-2"], [.. Employee.CreateSamples(4)], 12.12331M, 250, DateTime.Now);
    }
}
