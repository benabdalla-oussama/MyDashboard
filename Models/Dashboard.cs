using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace DynamicCharts.Models
{
    public class Dashboard
    {
        
        public int Id { get; set; }
        public string Title { get; set; }
        public DateTime Date { get; set; }
        public List<PieChart> Piecharts { get; set; }
    }
    public class DashboardModelView
    {

        public int id { get; set; }
        public string title { get; set; }
        public DateTime date { get; set; }
        public string piecharts { get; set; }
    }
}
