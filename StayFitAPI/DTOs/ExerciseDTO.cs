using StayFitAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace StayFitAPI.DTOs
{
    public class ExerciseDTO
    {
        
        public int ID { get; set; }
        public string Name { get; set; }
        public string MuscleGroup { get; set; }
    }
}