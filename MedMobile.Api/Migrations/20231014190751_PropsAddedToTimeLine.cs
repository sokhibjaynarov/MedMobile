using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MedMobile.Api.Migrations
{
    /// <inheritdoc />
    public partial class PropsAddedToTimeLine : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Description",
                schema: "MedMobile",
                table: "TimeLines",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "EventUrl",
                schema: "MedMobile",
                table: "TimeLines",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Title",
                schema: "MedMobile",
                table: "TimeLines",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "AdminUserId",
                schema: "MedMobile",
                table: "Hospitals",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_Sessions_TimeLineId",
                schema: "MedMobile",
                table: "Sessions",
                column: "TimeLineId");

            migrationBuilder.AddForeignKey(
                name: "FK_Sessions_TimeLines_TimeLineId",
                schema: "MedMobile",
                table: "Sessions",
                column: "TimeLineId",
                principalSchema: "MedMobile",
                principalTable: "TimeLines",
                principalColumn: "TimeLineId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Sessions_TimeLines_TimeLineId",
                schema: "MedMobile",
                table: "Sessions");

            migrationBuilder.DropIndex(
                name: "IX_Sessions_TimeLineId",
                schema: "MedMobile",
                table: "Sessions");

            migrationBuilder.DropColumn(
                name: "Description",
                schema: "MedMobile",
                table: "TimeLines");

            migrationBuilder.DropColumn(
                name: "EventUrl",
                schema: "MedMobile",
                table: "TimeLines");

            migrationBuilder.DropColumn(
                name: "Title",
                schema: "MedMobile",
                table: "TimeLines");

            migrationBuilder.DropColumn(
                name: "AdminUserId",
                schema: "MedMobile",
                table: "Hospitals");
        }
    }
}
