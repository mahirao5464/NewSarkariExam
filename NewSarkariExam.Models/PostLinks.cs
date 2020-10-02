using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using System.Text.Json.Serialization;

namespace NewSarkariExam.Models
{
    public class PostLinks
    {
        [Key]
        public int LinkId { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public string Link { get; set; }
        [JsonIgnore]
        public Job Job { get; set; } = null;

    }
}
