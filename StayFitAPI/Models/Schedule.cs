using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace StayFitAPI.Models
{
    
    public class Schedule
    {
        [Key]
        public int ID { get; set; }

        public string ApplicationUserID { get; set; }
        public int ExerciseID { get; set; }

        [ForeignKey("ApplicationUserID")]
        public virtual ApplicationUser ApplicationUser { get; set; }
        [ForeignKey("ExerciseID")]
        public virtual Exercise Exercise { get; set; }

        public DayOfWeek Day { get; set; }
        public byte Order { get; set; }
    }
}