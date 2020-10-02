using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;

namespace NewSarkariExam.Models.APIResponseModels
{
    public class CategoryResponse
    {
        public string Message { get; set; } = "Default message";
        public int Code { get; set; } = 999;
        public string Description { get; set; } = "Description";

    }
}
