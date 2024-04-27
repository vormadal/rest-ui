using System.Web.Http;

namespace ApiModels;

public class DepartmentEndpoints
{

    public Department GetDepartmentById(string id)
    {
        return Department.CreateSample(id);
    }

    public Department CreateDepartment([FromBody] Department department)
    {
        return department;
    }

    public void DeleteDepartment(string id)
    {

    }

    public Department UpdateDepartment(string id, [FromBody] Department department)
    {
        return department;
    }

    public List<Department> GetDepartmentList()
    {
        return Department.CreateSamples(10);
    }
}
