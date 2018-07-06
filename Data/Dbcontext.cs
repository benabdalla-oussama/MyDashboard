using DynamicCharts.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace DynamicCharts.Data
{
       public class dbcontext : DbContext
         {
        public dbcontext(DbContextOptions<dbcontext> options) : base(options)
        {
        }

        public DbSet<PieChart> PieCharts { get; set; }
        public DbSet<Country> Countrys { get; set; }
        public DbSet<Dashboard> Dashboards { get; set; }
        public DbSet<Models.Data> Datas { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<PieChart>()
                .HasOne(c => c.Dashboard)
                .WithMany(c => c.Piecharts)
                .HasForeignKey(c => c.DashboardId);



        }

    }
}
