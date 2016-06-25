using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace StayFitAPI.Models
{
    public class MuscleGroup
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public virtual ICollection<Exercise> Exercises { get; set; }
    }
}