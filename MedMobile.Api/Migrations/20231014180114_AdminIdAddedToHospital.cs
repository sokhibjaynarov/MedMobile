using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MedMobile.Api.Migrations
{
    /// <inheritdoc />
    public partial class AdminIdAddedToHospital : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TimeLines_User_DoctorUserId",
                schema: "MedMobile",
                table: "TimeLines");

            migrationBuilder.DropIndex(
                name: "IX_TimeLines_DoctorUserId",
                schema: "MedMobile",
                table: "TimeLines");

            migrationBuilder.AddColumn<Guid>(
                name: "UserId",
                schema: "MedMobile",
                table: "TimeLines",
                type: "uniqueidentifier",
                nullable: true);

            migrationBuilder.AddColumn<Guid>(
                name: "AdminUserId",
                schema: "MedMobile",
                table: "Hospitals",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));

            migrationBuilder.CreateIndex(
                name: "IX_TimeLines_UserId",
                schema: "MedMobile",
                table: "TimeLines",
                column: "UserId");

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

            migrationBuilder.AddForeignKey(
                name: "FK_TimeLines_User_UserId",
                schema: "MedMobile",
                table: "TimeLines",
                column: "UserId",
                principalSchema: "MedMobile",
                principalTable: "User",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Sessions_TimeLines_TimeLineId",
                schema: "MedMobile",
                table: "Sessions");

            migrationBuilder.DropForeignKey(
                name: "FK_TimeLines_User_UserId",
                schema: "MedMobile",
                table: "TimeLines");

            migrationBuilder.DropIndex(
                name: "IX_TimeLines_UserId",
                schema: "MedMobile",
                table: "TimeLines");

            migrationBuilder.DropIndex(
                name: "IX_Sessions_TimeLineId",
                schema: "MedMobile",
                table: "Sessions");

            migrationBuilder.DropColumn(
                name: "UserId",
                schema: "MedMobile",
                table: "TimeLines");

            migrationBuilder.DropColumn(
                name: "AdminUserId",
                schema: "MedMobile",
                table: "Hospitals");

            migrationBuilder.CreateIndex(
                name: "IX_TimeLines_DoctorUserId",
                schema: "MedMobile",
                table: "TimeLines",
                column: "DoctorUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_TimeLines_User_DoctorUserId",
                schema: "MedMobile",
                table: "TimeLines",
                column: "DoctorUserId",
                principalSchema: "MedMobile",
                principalTable: "User",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
