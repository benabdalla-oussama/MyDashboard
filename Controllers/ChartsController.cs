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

        [HttpPost("getData2/")]
        public Object getData2(string filters)
        {
            var myfilters = filters.FromJson<List<FilterModelView>>();
            List<List<Object>> modelView = new List<List<Object>>();
            foreach (var item in _context.Countrys.ToList())
            {
                List<Object> list = new List<Object>();
                list.Add(item.Name);
                list.Add(item.Population);
                modelView.Add(list);

            }
            ChartSeries series = new ChartSeries()
            {
                name = "Sales",
                data = modelView
            };
            return series;
        }

        [HttpPost("getData/")]
        public Object getData( string filters)
        {
            var myfilters = filters.FromJson<List<FilterModelView>>();
            List<List<Object>> modelView = new List<List<Object>>();
            foreach (var item in _context.Countrys.ToList())
            {
                List<Object> list = new List<Object>();
                list.Add(item.Name);
                list.Add(item.Sales);
                modelView.Add(list);

            }
            ChartSeries series = new ChartSeries()
            {
                name = "Sales" ,
                data = modelView
            };
            return series;
            
        }

        [HttpPost("getAreaData/")]
        public IEnumerable<Series> getAreaData( string filters)
        {
            var myfilters = filters.FromJson<List<FilterModelView>>();
            List<Series> data = new List<Series>();
            data.Add(new Series()
            {
                name = "USA" ,
                data = new List<Object>(){null, null, null, null, null, 6, 11, 32, 110, 235, 369, 640,
                1005, 1436, 2063, 3057, 4618, 6444, 9822, 15468, 20434, 24126,
                27387, 29459, 31056, 31982, 32040, 31233, 29224, 27342, 26662,
                26956, 27912, 28999, 28965, 27826, 25579, 25722, 24826, 24605,
                24304, 23464, 23708, 24099, 24357, 24237, 24401, 24344, 23586,
                22380, 21004, 17287, 14747, 13076, 12555, 12144, 11009, 10950,
                10871, 10824, 10577, 10527, 10475, 10421, 10358, 10295, 10104}
            });
            data.Add(new Series()
            {
                name = "USSR/Russia",
                data = new List<Object>(){null, null, null, null, null, null, null, null, null, null,
                    5, 25, 50, 120, 150, 200, 426, 660, 869, 1060, 1605, 2471, 3322,
                    4238, 5221, 6129, 7089, 8339, 9399, 10538, 11643, 13092, 14478,
                    15915, 17385, 19055, 21205, 23044, 25393, 27935, 30062, 32049,
                    33952, 35804, 37431, 39197, 45000, 43000, 41000, 39000, 37000,
                    35000, 33000, 31000, 29000, 27000, 25000, 24000, 23000, 22000,
                    21000, 20000, 19000, 18000, 18000, 17000, 16000}
            });
            return data;

        }

        [HttpPost("getScatterData/")]
        public IEnumerable<Series> getScatterData(string filters)
        {
            var myfilters = filters.FromJson<List<FilterModelView>>();
            List<Series> data = new List<Series>();
            data.Add(new Series()
            {
                name = "Female",
                data = new List<Object>()
                {
                    new List<Object>(){ 161.2, 51.6 }, new List<Object>() { 167.2, 41.6 }, new List<Object>() { 171.2, 60.6 },
                    new List<Object>(){ 180.2, 49.6 },new List<Object>(){ 150.2, 66.6 },new List<Object>(){ 177.2, 51.6 },
                    new List<Object>(){ 160.2, 55.6 },new List<Object>(){ 110.2, 40.6 },new List<Object>(){ 111.2, 71.6 },
                }
            });
            data.Add(new Series()
            {
                name = "Male",
                data = new List<Object>(){
                    new List<Object>(){ 170.2, 51.6 }, new List<Object>() { 167.2, 56.6 }, new List<Object>() { 175.2, 30.6 },
                    new List<Object>(){ 180.2, 78.6 },new List<Object>(){ 150.2, 36.6 },new List<Object>(){ 133.2, 51.6 },
                }
            });
            return data;

        }
        

        [HttpPost("getBarData/")]
        public IEnumerable<Series> getBarData(string filters)
        {
            var myfilters = filters.FromJson<List<FilterModelView>>();
            List<Series> data = new List<Series>();
            data.Add(new Series()
            {
                name = "Year 1800",
                data = new List<Object>(){
                    107, 31, 635, 203, 2}
            });
            data.Add(new Series()
            {
                name = "Year 1900",
                data = new List<Object>(){
                    133, 156, 947, 408, 6}
            });
            data.Add(new Series()
            {
                name = "Year 2000",
                data = new List<Object>(){
                    814, 841, 3714, 727, 31}
            });
            data.Add(new Series()
            {
                name = "Year 2016",
                data = new List<Object>(){
                    1216, 1001, 4436, 738, 40}
            });
           
            return data;

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