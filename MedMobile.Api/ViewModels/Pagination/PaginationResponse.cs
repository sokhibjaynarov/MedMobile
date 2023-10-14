using System.Collections.Generic;

namespace MedMobile.Api.ViewModels.Pagination
{
    public class PaginationResponse
    {
        public object List { get; set; }
        public int Skip { get; set; }
        public int Take { get; set; }
        public int Count { get; set; }

        public PaginationResponse(object list, int skip, int take, int count)
        {
            List = list;
            Skip = skip;
            Take = take;
            Count = count;
        }
    }
}
