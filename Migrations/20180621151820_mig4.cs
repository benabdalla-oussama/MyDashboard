using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace DynamicCharts.Migrations
{
    public partial class mig4 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PieCharts_Dashboard_IdDashboard",
                table: "PieCharts");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Dashboard",
                table: "Dashboard");

            migrationBuilder.RenameTable(
                name: "Dashboard",
                newName: "Dashboards");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Dashboards",
                table: "Dashboards",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_PieCharts_Dashboards_IdDashboard",
                table: "PieCharts",
                column: "IdDashboard",
                principalTable: "Dashboards",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PieCharts_Dashboards_IdDashboard",
                table: "PieCharts");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Dashboards",
                table: "Dashboards");

            migrationBuilder.RenameTable(
                name: "Dashboards",
                newName: "Dashboard");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Dashboard",
                table: "Dashboard",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_PieCharts_Dashboard_IdDashboard",
                table: "PieCharts",
                column: "IdDashboard",
                principalTable: "Dashboard",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
