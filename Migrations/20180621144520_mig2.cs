using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;
using System;
using System.Collections.Generic;

namespace DynamicCharts.Migrations
{
    public partial class mig2 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "IdDashboard",
                table: "PieCharts",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "high",
                table: "PieCharts",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "width",
                table: "PieCharts",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "x",
                table: "PieCharts",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "y",
                table: "PieCharts",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateTable(
                name: "Dashboard",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:ValueGenerationStrategy", SqlServerValueGenerationStrategy.IdentityColumn),
                    Title = table.Column<string>(nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Dashboard", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_PieCharts_IdDashboard",
                table: "PieCharts",
                column: "IdDashboard");

            migrationBuilder.AddForeignKey(
                name: "FK_PieCharts_Dashboard_IdDashboard",
                table: "PieCharts",
                column: "IdDashboard",
                principalTable: "Dashboard",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PieCharts_Dashboard_IdDashboard",
                table: "PieCharts");

            migrationBuilder.DropTable(
                name: "Dashboard");

            migrationBuilder.DropIndex(
                name: "IX_PieCharts_IdDashboard",
                table: "PieCharts");

            migrationBuilder.DropColumn(
                name: "IdDashboard",
                table: "PieCharts");

            migrationBuilder.DropColumn(
                name: "high",
                table: "PieCharts");

            migrationBuilder.DropColumn(
                name: "width",
                table: "PieCharts");

            migrationBuilder.DropColumn(
                name: "x",
                table: "PieCharts");

            migrationBuilder.DropColumn(
                name: "y",
                table: "PieCharts");
        }
    }
}
