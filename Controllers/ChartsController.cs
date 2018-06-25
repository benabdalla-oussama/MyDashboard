using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Threading.Tasks;
using DynamicCharts.Data;
using DynamicCharts.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace DynamicCharts.Controllers
{
    public class ChartsController : Controller
    {
        private readonly dbcontext _context;

        public ChartsController(dbcontext context)
        {
            _context = context;
        }
        public async Task<IActionResult> Index()
        {
            return View(await _context.PieCharts.ToListAsync());
        }


        public async Task<IActionResult> test()
        {
            return View();
        }


        [HttpGet("getData2/{axeX}/{axeY}")]
        public IEnumerable<Object> getData2(string axeX , string axeY)
        {
            List<Country> countries = new List<Country>()
            {
                new Country{Name = "Tunisie", Sales = 150 , Population = 12000000} ,
                new Country{Name = "US", Sales = 250, Population = 244000000} ,
                new Country{Name = "France", Sales = 200, Population = 250000000} ,
                new Country{Name = "Turkey", Sales = 120, Population = 79000000} 

            };
            List<Object> modelView = new List<Object>();
            foreach (var item in countries)
            {

                dynamic myobject = new ExpandoObject();

                IDictionary<string, object> myUnderlyingObject = myobject;

                myUnderlyingObject.Add(axeX, GetPropValue(item, axeX));
                myUnderlyingObject.Add(axeY, GetPropValue(item, axeY));
                modelView.Add(myUnderlyingObject);

            }
            return modelView;
        }

        [HttpGet("getData/{axeX}/{axeY}")]
        public IEnumerable<Object> getData(string axeX, string axeY)
        {
           
            List<List<Object>> modelView = new List<List<Object>>();
            foreach (var item in _context.Countrys.ToList())
            {
                List<Object> list = new List<Object>();
                list.Add(GetPropValue(item, axeX));
                list.Add(GetPropValue(item, axeY));
                modelView.Add(list);

            }
            return modelView;
        }

        [HttpGet("getDashboards")]
        public IEnumerable<Dashboard> getDashboards()
        {
            return _context.Dashboards.ToList();
          }
        public static object GetPropValue(object src, string propName)
        {
            return src.GetType().GetProperty(propName).GetValue(src, null);
        }

    }
}