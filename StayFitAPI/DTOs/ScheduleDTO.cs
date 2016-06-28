using StayFitAPI.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace StayFitAPI.DTOs
{
    public class ScheduleDTO
    {
        public int ID { get; set; }
        public int ExerciseID { get; set; }
        public string ExerciseName { get; set; }
        public DayOfWeek Day { get; set; }
        public byte Order { get; set; }
    }
    public class Schedule2DTO
    {
        public int ExerciseID { get; set; }
        public string ExerciseName { get; set; }
    }
}