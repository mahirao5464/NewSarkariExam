 using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace NewSarkariExam.Models
{
    public class Category
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string ShortName { get; set; }
        [Required]
        public string StateName { get; set; }
        public string Description { get; set; }
        public bool CategoryStatus { get; set; } = true;

        [JsonIgnore]
        public ICollection<Job> Jobs { get; set; }
    }
}
