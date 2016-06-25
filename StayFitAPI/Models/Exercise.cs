using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace StayFitAPI.Models
{
    public class Exercise
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string VideoUrl { get; set; }

        public virtual MuscleGroup MuscleGroup { get; set; }
        public virtual ICollection<Schedule> Schedules { get; set; }
    }
}