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
using WebAPIBike.Models;
using System.Web.Http.Cors;

namespace WebAPIBike.Controllers
{
    //[EnableCors(origins: "http://localhost:4200", headers: "*", methods: "*")]
    public class BikesController : ApiController
    {
        private DBModel db = new DBModel();

        // GET: api/Bikes
        public IQueryable<Bikes> GetBikes()
        {
            return db.Bikes;
        }

        // GET: api/Bikes/5
        [ResponseType(typeof(Bikes))]
        public IHttpActionResult GetBikes(int id)
        {
            Bikes bikes = db.Bikes.Find(id);
            if (bikes == null)
            {
                return NotFound();
            }

            return Ok(bikes);
        }

        // PUT: api/Bikes/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutBikes(int id, Bikes bikes)
        {
            if (id != bikes.BikeID)
            {
                return BadRequest();
            }

            db.Entry(bikes).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!BikesExists(id))
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

        // POST: api/Bikes
        [ResponseType(typeof(Bikes))]
        public IHttpActionResult PostBikes(Bikes bikes)
        {
            db.Bikes.Add(bikes);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = bikes.BikeID }, bikes);
        }

        // DELETE: api/Bikes/5
        [ResponseType(typeof(Bikes))]
        public IHttpActionResult DeleteBikes(int id)
        {
            Bikes bikes = db.Bikes.Find(id);
            if (bikes == null)
            {
                return NotFound();
            }

            db.Bikes.Remove(bikes);
            db.SaveChanges();

            return Ok(bikes);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool BikesExists(int id)
        {
            return db.Bikes.Count(e => e.BikeID == id) > 0;
        }
    }
}