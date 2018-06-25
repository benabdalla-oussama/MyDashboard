using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace DynamicCharts.Migrations
{
    public partial class mig3 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "sales",
                table: "Countrys",
                newName: "Sales");

            migrationBuilder.RenameColumn(
                name: "population",
                table: "Countrys",
                newName: "Population");

            migrationBuilder.RenameColumn(
                name: "nom",
                table: "Countrys",
                newName: "Name");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Sales",
                table: "Countrys",
                newName: "sales");

            migrationBuilder.RenameColumn(
                name: "Population",
                table: "Countrys",
                newName: "population");

            migrationBuilder.RenameColumn(
                name: "Name",
                table: "Countrys",
                newName: "nom");
        }
    }
}
