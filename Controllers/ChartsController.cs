using System;
using System.Collections.Generic;
using System.Dynamic;
using System.Linq;
using System.Threading.Tasks;
using DynamicCharts.Data;
using DynamicCharts.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using NuGet.Protocol;
using Attribute = DynamicCharts.Models.Attribute;

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

        //[HttpPost]
        //[ValidateAntiForgeryToken]
        //public async Task<int> SaveDashboard( [Bind("ID,Title,ReleaseDate,Genre,Price")] List<PieChart> piecharts)
        //{

        //    return 1;
        //}

        [HttpGet("data/")]
        public IEnumerable<Object> getMyData()
        {
            return _context.Datas.ToList();
        }

        //[HttpGet("getData2/{xAxis}/{yAxis}")]
        //public IEnumerable<Object> getData2(string xAxis , string yAxis)
        //{

        //    List<List<Object>> modelView = new List<List<Object>>();
        //    foreach (var item in _context.Countrys.ToList())
        //    {
        //        List<Object> list = new List<Object>();
        //        list.Add(GetPropValue(item, xAxis));
        //        list.Add(GetPropValue(item, yAxis));
        //        modelView.Add(list);

        //    }
        //    return modelView;
        //}

        //[HttpGet("getData/{xAxis}/{yAxis}")]
        //public IEnumerable<Object> getData(string xAxis, string yAxis)
        //{

        //    List<List<Object>> modelView = new List<List<Object>>();
        //    foreach (var item in _context.Countrys.ToList())
        //    {
        //        List<Object> list = new List<Object>();
        //        list.Add(GetPropValue(item, xAxis));
        //        list.Add(GetPropValue(item, yAxis));
        //        modelView.Add(list);

        //    }
        //    return modelView;
        //}

        [HttpPost("getData2/{xAxis}/{yAxis}")]
        public IEnumerable<Object> getData2(string xAxis, string yAxis , string filters)
        {
            var myfilters = filters.FromJson<List<FilterModelView>>();
            List<List<Object>> modelView = new List<List<Object>>();
            foreach (var item in _context.Countrys.ToList())
            {
                List<Object> list = new List<Object>();
                list.Add(GetPropValue(item, xAxis));
                list.Add(GetPropValue(item, yAxis));
                modelView.Add(list);

            }
            return modelView;
        }

        [HttpPost("getData/{xAxis}/{yAxis}")]
        public IEnumerable<Object> getData(string xAxis, string yAxis, string filters)
        {
            var myfilters = filters.FromJson<List<FilterModelView>>();
            List<List<Object>> modelView = new List<List<Object>>();
            foreach (var item in _context.Countrys.ToList())
            {
                List<Object> list = new List<Object>();
                list.Add(GetPropValue(item, xAxis));
                list.Add(GetPropValue(item, yAxis));
                modelView.Add(list);

            }
            return modelView;
        }


        [HttpGet("getAttributes")]
        public IEnumerable<Object> getAttributes()
        {

            List<Attribute> modelView = new List<Attribute>();
            Filter filter1 = new Filter()
            {
                Name = "Entre",
                ParamsNumber = 2 , 
                Type = "Number"
            };
            Filter filter2 = new Filter()
            {
                Name = "Dans",
                ParamsNumber = 2,
                Type = "Number"
            };
            Filter filter3 = new Filter()
            {
                Name = "Dans2",
                ParamsNumber = 2,
                Type = "Number"
            };
            Attribute attribute1 = new Attribute() {Name = "Population", Filters = new List<Filter>()};
            attribute1.Filters.Add(filter1);
            Attribute attribute2 = new Attribute() { Name = "Sales", Filters = new List<Filter>() };
            attribute2.Filters.Add(filter2);
            attribute2.Filters.Add(filter3);

            modelView.Add(attribute1);
            modelView.Add(attribute2);

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