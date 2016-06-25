using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace StayFitAPI.DTOs
{
    public class ExerciseDetailsDTO
    {
        public ExerciseDetailsDTO (Models.Exercise e)
        {
            ID = e.ID;
            Name = e.Name;
            Description = e.Description;
            VideoUrl = e.VideoUrl;
            MuscleGroup = e.MuscleGroup.Name;
        }
        public int ID { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string VideoUrl { get; set; }
        public string MuscleGroup { get; set; }
    }
}