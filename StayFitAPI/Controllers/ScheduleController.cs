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
using Microsoft.AspNet.Identity;

namespace StayFitAPI.Controllers
{
    [Authorize]
    public class ScheduleController : ApiController
    {
        private ApplicationDbContext db = new ApplicationDbContext();

        // GET: api/Schedule
        public IQueryable<Schedule> GetSchedules()
        {
            var userId = User.Identity.GetUserId();
            var schedule = from s in db.Schedules
                           where s.ApplicationUserID.Equals(userId)
                           select s;
            return schedule;
        }

        // GET: api/Schedule/5
        [ResponseType(typeof(Schedule))]
        public IHttpActionResult GetSchedule(string id)
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
        public IHttpActionResult PutSchedule(string id, Schedule schedule)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != schedule.ApplicationUserID)
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
        public IHttpActionResult PostSchedule(Schedule schedule)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Schedules.Add(schedule);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateException)
            {
                if (ScheduleExists(schedule.ApplicationUserID))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = schedule.ApplicationUserID }, schedule);
        }

        // DELETE: api/Schedule/5
        [ResponseType(typeof(Schedule))]
        public IHttpActionResult DeleteSchedule(string id)
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

        private bool ScheduleExists(string id)
        {
            return db.Schedules.Count(e => e.ApplicationUserID == id) > 0;
        }
    }
}