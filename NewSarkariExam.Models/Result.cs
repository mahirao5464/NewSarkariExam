using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace NewSarkariExam.Models
{
    public class Result
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [ForeignKey("Job")]
        public int JobId { get; set; }
        [Required]
        public string ResultContect { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime UpdatedOn { get; set; } = DateTime.Now;
        public string Description { get; set; }
        public virtual Job Job { get; set; }

    }
}
