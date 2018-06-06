using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using DynamicCharts.Data;
using DynamicCharts.Models;

namespace DynamicCharts.Controllers
{
    public class PieChartsController : Controller
    {
        private readonly dbcontext _context;

        public PieChartsController(dbcontext context)
        {
            _context = context;
        }

        // GET: PieCharts
        public async Task<IActionResult> Index()
        {
            return View(await _context.PieCharts.ToListAsync());
        }

        // GET: PieCharts/Details/5
        public async Task<IActionResult> Details(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var pieChart = await _context.PieCharts
                .SingleOrDefaultAsync(m => m.Id == id);
            if (pieChart == null)
            {
                return NotFound();
            }

            return View(pieChart);
        }

        // GET: PieCharts/Create
        public IActionResult Create()
        {
            return View();
        }

        // POST: PieCharts/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Create([Bind("Id,Title,XAxis,YAxis,Detail,Url")] PieChart pieChart)
        {
            if (ModelState.IsValid)
            {
                _context.Add(pieChart);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(pieChart);
        }

        // GET: PieCharts/Edit/5
        public async Task<IActionResult> Edit(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var pieChart = await _context.PieCharts.SingleOrDefaultAsync(m => m.Id == id);
            if (pieChart == null)
            {
                return NotFound();
            }
            return View(pieChart);
        }

        // POST: PieCharts/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> Edit(int id, [Bind("Id,Title,XAxis,YAxis,Detail,Url")] PieChart pieChart)
        {
            if (id != pieChart.Id)
            {
                return NotFound();
            }

            if (ModelState.IsValid)
            {
                try
                {
                    _context.Update(pieChart);
                    await _context.SaveChangesAsync();
                }
                catch (DbUpdateConcurrencyException)
                {
                    if (!PieChartExists(pieChart.Id))
                    {
                        return NotFound();
                    }
                    else
                    {
                        throw;
                    }
                }
                return RedirectToAction(nameof(Index));
            }
            return View(pieChart);
        }

        // GET: PieCharts/Delete/5
        public async Task<IActionResult> Delete(int? id)
        {
            if (id == null)
            {
                return NotFound();
            }

            var pieChart = await _context.PieCharts
                .SingleOrDefaultAsync(m => m.Id == id);
            if (pieChart == null)
            {
                return NotFound();
            }

            return View(pieChart);
        }

        // POST: PieCharts/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var pieChart = await _context.PieCharts.SingleOrDefaultAsync(m => m.Id == id);
            _context.PieCharts.Remove(pieChart);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }

        private bool PieChartExists(int id)
        {
            return _context.PieCharts.Any(e => e.Id == id);
        }
    }
}
