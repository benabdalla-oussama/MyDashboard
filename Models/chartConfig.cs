using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DynamicCharts.Models
{
    public class chartConfig
    {
        public int Id { get; set; }
        public string type { get; set; }
        public string title { get; set; }
        public string xAxis { get; set; }
        public string yAxis { get; set; }
        public string url { get; set; }
        public string subtitle { get; set; }
    }
}
