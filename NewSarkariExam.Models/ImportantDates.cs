using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using System.Text.Json.Serialization;

namespace NewSarkariExam.Models
{
    public class ImportantDates
    {

        [Key]
        public int Id { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public string DateOrText { get; set; }
        [JsonIgnore]
        public Job Job { get; set; } = null;
    }
}
