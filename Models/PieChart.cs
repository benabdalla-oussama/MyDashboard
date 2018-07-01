using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace DynamicCharts.Models
{
    public class PieChart
    { 
        public int Id { get; set; }
        public string Title { get; set; }
        public string XAxis { get; set; }
        public string YAxis { get; set; }
        public string Detail { get; set; }
        public string Url { get; set; }
        public int x { get; set; }
        public int y { get; set; }
        public int high { get; set; }
        public int width { get; set; }
        public string options { get; set; }
        public Dashboard Dashboard { get; set; }

    }

}
