using Microsoft.EntityFrameworkCore.Migrations;

namespace NewSarkariExam.DataAccess.Migrations
{
    public partial class updatecategorystatus : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "CategoryStatus",
                table: "Category",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CategoryStatus",
                table: "Category");
        }
    }
}
