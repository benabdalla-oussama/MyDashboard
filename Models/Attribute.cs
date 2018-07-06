using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DynamicCharts.Models
{
    public class Attribute
    {
        public string Name { get; set; }
        public List<Filter> Filters { get; set; }
    }
}
