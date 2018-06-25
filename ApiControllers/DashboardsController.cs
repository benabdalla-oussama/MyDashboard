using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DynamicCharts.Data;
using DynamicCharts.Models;

namespace DynamicCharts.ApiControllers
{
    [Produces("application/json")]
    [Route("api/Dashboards")]
    public class DashboardsController : Controller
    {
        private readonly dbcontext _context;

        public DashboardsController(dbcontext context)
        {
            _context = context;
        }

        // GET: api/Dashboards
        [HttpGet]
        public IEnumerable<Dashboard> GetDashboards()
        {
            return _context
                .Dashboards
                .Include(d => d.Piecharts);
        }

        // GET: api/Dashboards/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetDashboard([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var dashboard = await _context.Dashboards.SingleOrDefaultAsync(m => m.Id == id);

            if (dashboard == null)
            {
                return NotFound();
            }

            return Ok(dashboard);
        }

        // PUT: api/Dashboards/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDashboard([FromRoute] int id, [FromBody] Dashboard dashboard)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != dashboard.Id)
            {
                return BadRequest();
            }

            _context.Entry(dashboard).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DashboardExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Dashboards
        [HttpPost]
        public async Task<IActionResult> PostDashboard([FromBody] Dashboard dashboard)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            _context.Dashboards.Add(dashboard);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDashboard", new { id = dashboard.Id }, dashboard);
        }

        // DELETE: api/Dashboards/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDashboard([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var dashboard = await _context.Dashboards.SingleOrDefaultAsync(m => m.Id == id);
            if (dashboard == null)
            {
                return NotFound();
            }

            _context.Dashboards.Remove(dashboard);
            await _context.SaveChangesAsync();

            return Ok(dashboard);
        }

        private bool DashboardExists(int id)
        {
            return _context.Dashboards.Any(e => e.Id == id);
        }
    }
}