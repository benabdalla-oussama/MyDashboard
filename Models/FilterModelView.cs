using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DynamicCharts.Models
{
    public class FilterModelView
    {
        public string attribute { get; set; }
        public string filter { get; set; }
        public int paramsNumber { get; set; }
        public string param1 { get; set; }
        public string param2 { get; set; }

    }

}