using Microsoft.EntityFrameworkCore.Migrations;

namespace NewSarkariExam.DataAccess.Migrations
{
    public partial class updatecategorytable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ShortName",
                table: "Category",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "StateName",
                table: "Category",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ShortName",
                table: "Category");

            migrationBuilder.DropColumn(
                name: "StateName",
                table: "Category");
        }
    }
}
