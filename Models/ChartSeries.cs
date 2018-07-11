using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DynamicCharts.Models
{
    public class ChartSeries
    {
        public string name { get; set; } 
        public List<List<Object>> data { get; set; }
    }
}
