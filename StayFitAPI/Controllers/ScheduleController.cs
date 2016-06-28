using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using StayFitAPI.Models;
using StayFitAPI.DTOs;
using Microsoft.AspNet.Identity;

namespace StayFitAPI.Controllers
{
    [Authorize]
    public class ScheduleController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        //GET api/schedule
        public List<Schedule2DTO>[] GetSchedule()
        {
            var userId = User.Identity.GetUserId(); //get current user
            var schedule = from s in db.Schedules
                           join e in db.Exercises on s.ExerciseID equals e.ID
                           where s.ApplicationUserID.Equals(userId)
                           orderby s.Order
                           select new {
                               ID = s.ID,
                               ExerciseID = s.ExerciseID,
                               ExerciseName = e.Name,
                               Day = s.Day,
                               Order = s.Order
                           };
            List<Schedule2DTO>[] result = new List<Schedule2DTO>[7];
            for (int i = 0; i < 7; i++)
            {
                result[i] = new List<Schedule2DTO>();
            }

            foreach (var ex in schedule)
            {
                var sc = new Schedule2DTO { ExerciseID = ex.ExerciseID, ExerciseName = ex.ExerciseName };
                result[(int)ex.Day].Add(sc);
            }
            return result;
        }

        // GET: api/Schedule/5
        [ResponseType(typeof(Schedule))]
        public IHttpActionResult GetSchedule(int id)
        {
            Schedule schedule = db.Schedules.Find(id);
            if (schedule == null)
            {
                return NotFound();
            }

            return Ok(schedule);
        }

        // PUT: api/Schedule/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutSchedule(int id, Schedule schedule)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != schedule.ID)
            {
                return BadRequest();
            }

            db.Entry(schedule).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ScheduleExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/Schedule
        [ResponseType(typeof(Schedule))]
        public IHttpActionResult PostSchedule([FromBody] List<List<Schedule2DTO>> schedule)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var userId = User.Identity.GetUserId();
            var oldScheduleQuery = from ex in db.Schedules
                                   where ex.ApplicationUserID == userId
                                   select ex;
            db.Schedules.RemoveRange(oldScheduleQuery);

            for (int i = 0; i < schedule.Count; i++)
            {
                for (int j = 0; j < schedule[i].Count; j++)
                {
                    db.Schedules.Add(new Schedule
                    {
                        ApplicationUserID = userId,
                        ExerciseID = schedule[i][j].ExerciseID,
                        Day = (DayOfWeek)i,
                        Order = (byte)j
                    });
                }
            }

            db.SaveChanges();

            return Created("DefaultApi", schedule);
        }

        // DELETE: api/Schedule/5
        [ResponseType(typeof(Schedule))]
        public IHttpActionResult DeleteSchedule(int id)
        {
            Schedule schedule = db.Schedules.Find(id);
            if (schedule == null)
            {
                return NotFound();
            }

            db.Schedules.Remove(schedule);
            db.SaveChanges();

            return Ok(schedule);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool ScheduleExists(int id)
        {
            return db.Schedules.Count(e => e.ID == id) > 0;
        }
    }
}