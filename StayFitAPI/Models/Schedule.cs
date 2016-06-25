using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace StayFitAPI.Models
{
    public enum DayOfWeek
    {
        Mon, Tue, Wed, Thu, Fri, Sat, Sun
    }

    public class Schedule
    {
        [Key, Column(Order = 0)]
        public string ApplicationUserID { get; set; }
        [Key, Column(Order = 1)]
        public int ExerciseID { get; set; }

        public virtual ApplicationUser ApplicationUser { get; set; }
        public virtual Exercise Exercise { get; set; }

        public DayOfWeek Day { get; set; }
        public byte Order { get; set; }
    }
}