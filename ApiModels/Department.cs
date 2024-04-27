namespace ApiModels;

public class Department(
string Id,
string Department_name,
DateTime Created
)
{
    public string Id { get; } = Id;
    public string Department_Name { get; } = Department_name;
    public DateTime Created { get; } = Created;

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
        return new Department($"{id}", $"Name {id}", DateTime.Now);
    }
}
