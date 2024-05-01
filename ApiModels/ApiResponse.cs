namespace ApiModels;

public class ApiResponse<T>
{
    public T Data { get; set; }
}

public class ApiListResponse<T> : ApiResponse<List<T>>
{

}


public class PagedApiResponse<T> : ApiListResponse<T>
{
    public int PageSize { get; set; }

    public int PageNumber { get; set; }

    public int TotalCount { get; set; }
}
