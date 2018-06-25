using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace DynamicCharts.Migrations
{
    public partial class mig6 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PieCharts_Dashboards_IdDashboard",
                table: "PieCharts");

            migrationBuilder.DropIndex(
                name: "IX_PieCharts_IdDashboard",
                table: "PieCharts");

            migrationBuilder.DropColumn(
                name: "IdDashboard",
                table: "PieCharts");

            migrationBuilder.AddColumn<int>(
                name: "DashboardId",
                table: "PieCharts",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_PieCharts_DashboardId",
                table: "PieCharts",
                column: "DashboardId");

            migrationBuilder.AddForeignKey(
                name: "FK_PieCharts_Dashboards_DashboardId",
                table: "PieCharts",
                column: "DashboardId",
                principalTable: "Dashboards",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PieCharts_Dashboards_DashboardId",
                table: "PieCharts");

            migrationBuilder.DropIndex(
                name: "IX_PieCharts_DashboardId",
                table: "PieCharts");

            migrationBuilder.DropColumn(
                name: "DashboardId",
                table: "PieCharts");

            migrationBuilder.AddColumn<int>(
                name: "IdDashboard",
                table: "PieCharts",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_PieCharts_IdDashboard",
                table: "PieCharts",
                column: "IdDashboard");

            migrationBuilder.AddForeignKey(
                name: "FK_PieCharts_Dashboards_IdDashboard",
                table: "PieCharts",
                column: "IdDashboard",
                principalTable: "Dashboards",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
