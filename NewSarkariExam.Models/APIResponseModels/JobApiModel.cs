using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace NewSarkariExam.Models.APIResponseModels
{
    public class JobApiModel
    {

        [Key]
        public int Id { get; set; }
        [Required]
        public string PostName { get; set; }
        [Required]
        public string PostShortName { get; set; }
        public DateTime PostedOn { get; set; }
        public int TotalPost { get; set; }
        public DateTime LastUpdatedOn { get; set; } = DateTime.Now;
        [Required]
        public string AdvtNo { get; set; }
        [Required]
        public string PostLink { get; set; }
        public ICollection<PostLinks> ImportantLinks { get; set; }
        public ICollection<ImportantDates> ImportantDates { get; set; }
        [Required]
        public string Description { get; set; }

        public DateTime ApplicationStartDate { get; set; }
        public DateTime ApplicationLastDate { get; set; }
        public DateTime ApplicationLastDateOfFee { get; set; }
        [Required]
        public int CategoryId { get; set; }
        public string OtherDetails { get; set; }

    }
}
