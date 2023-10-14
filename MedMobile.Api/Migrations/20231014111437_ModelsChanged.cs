using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MedMobile.Api.Migrations
{
    /// <inheritdoc />
    public partial class ModelsChanged : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DoctorField_Doctors_DoctorId",
                schema: "Identity",
                table: "DoctorField");

            migrationBuilder.DropForeignKey(
                name: "FK_DoctorField_Fields_FieldId",
                schema: "Identity",
                table: "DoctorField");

            migrationBuilder.DropPrimaryKey(
                name: "PK_DoctorField",
                schema: "Identity",
                table: "DoctorField");

            migrationBuilder.EnsureSchema(
                name: "MedMobile");

            migrationBuilder.RenameTable(
                name: "UserTokens",
                schema: "Identity",
                newName: "UserTokens",
                newSchema: "MedMobile");

            migrationBuilder.RenameTable(
                name: "UserRoles",
                schema: "Identity",
                newName: "UserRoles",
                newSchema: "MedMobile");

            migrationBuilder.RenameTable(
                name: "UserLogins",
                schema: "Identity",
                newName: "UserLogins",
                newSchema: "MedMobile");

            migrationBuilder.RenameTable(
                name: "UserClaims",
                schema: "Identity",
                newName: "UserClaims",
                newSchema: "MedMobile");

            migrationBuilder.RenameTable(
                name: "User",
                schema: "Identity",
                newName: "User",
                newSchema: "MedMobile");

            migrationBuilder.RenameTable(
                name: "TimeLines",
                schema: "Identity",
                newName: "TimeLines",
                newSchema: "MedMobile");

            migrationBuilder.RenameTable(
                name: "Sessions",
                schema: "Identity",
                newName: "Sessions",
                newSchema: "MedMobile");

            migrationBuilder.RenameTable(
                name: "RoleClaims",
                schema: "Identity",
                newName: "RoleClaims",
                newSchema: "MedMobile");

            migrationBuilder.RenameTable(
                name: "Role",
                schema: "Identity",
                newName: "Role",
                newSchema: "MedMobile");

            migrationBuilder.RenameTable(
                name: "Hospitals",
                schema: "Identity",
                newName: "Hospitals",
                newSchema: "MedMobile");

            migrationBuilder.RenameTable(
                name: "Fields",
                schema: "Identity",
                newName: "Fields",
                newSchema: "MedMobile");

            migrationBuilder.RenameTable(
                name: "Doctors",
                schema: "Identity",
                newName: "Doctors",
                newSchema: "MedMobile");

            migrationBuilder.RenameTable(
                name: "DoctorField",
                schema: "Identity",
                newName: "DoctorFields",
                newSchema: "MedMobile");

            migrationBuilder.RenameColumn(
                name: "RejectedBy",
                schema: "MedMobile",
                table: "Sessions",
                newName: "CanceledBy");

            migrationBuilder.RenameColumn(
                name: "Number",
                schema: "MedMobile",
                table: "Hospitals",
                newName: "PhoneNumber");

            migrationBuilder.RenameIndex(
                name: "IX_DoctorField_FieldId",
                schema: "MedMobile",
                table: "DoctorFields",
                newName: "IX_DoctorFields_FieldId");

            migrationBuilder.RenameIndex(
                name: "IX_DoctorField_DoctorId",
                schema: "MedMobile",
                table: "DoctorFields",
                newName: "IX_DoctorFields_DoctorId");

            migrationBuilder.AddColumn<string>(
                name: "ReasonOfCanceling",
                schema: "MedMobile",
                table: "Sessions",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Name",
                schema: "MedMobile",
                table: "Hospitals",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddPrimaryKey(
                name: "PK_DoctorFields",
                schema: "MedMobile",
                table: "DoctorFields",
                column: "DoctorFieldId");

            migrationBuilder.AddForeignKey(
                name: "FK_DoctorFields_Doctors_DoctorId",
                schema: "MedMobile",
                table: "DoctorFields",
                column: "DoctorId",
                principalSchema: "MedMobile",
                principalTable: "Doctors",
                principalColumn: "DoctorId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_DoctorFields_Fields_FieldId",
                schema: "MedMobile",
                table: "DoctorFields",
                column: "FieldId",
                principalSchema: "MedMobile",
                principalTable: "Fields",
                principalColumn: "FieldId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_DoctorFields_Doctors_DoctorId",
                schema: "MedMobile",
                table: "DoctorFields");

            migrationBuilder.DropForeignKey(
                name: "FK_DoctorFields_Fields_FieldId",
                schema: "MedMobile",
                table: "DoctorFields");

            migrationBuilder.DropPrimaryKey(
                name: "PK_DoctorFields",
                schema: "MedMobile",
                table: "DoctorFields");

            migrationBuilder.DropColumn(
                name: "ReasonOfCanceling",
                schema: "MedMobile",
                table: "Sessions");

            migrationBuilder.DropColumn(
                name: "Name",
                schema: "MedMobile",
                table: "Hospitals");

            migrationBuilder.EnsureSchema(
                name: "Identity");

            migrationBuilder.RenameTable(
                name: "UserTokens",
                schema: "MedMobile",
                newName: "UserTokens",
                newSchema: "Identity");

            migrationBuilder.RenameTable(
                name: "UserRoles",
                schema: "MedMobile",
                newName: "UserRoles",
                newSchema: "Identity");

            migrationBuilder.RenameTable(
                name: "UserLogins",
                schema: "MedMobile",
                newName: "UserLogins",
                newSchema: "Identity");

            migrationBuilder.RenameTable(
                name: "UserClaims",
                schema: "MedMobile",
                newName: "UserClaims",
                newSchema: "Identity");

            migrationBuilder.RenameTable(
                name: "User",
                schema: "MedMobile",
                newName: "User",
                newSchema: "Identity");

            migrationBuilder.RenameTable(
                name: "TimeLines",
                schema: "MedMobile",
                newName: "TimeLines",
                newSchema: "Identity");

            migrationBuilder.RenameTable(
                name: "Sessions",
                schema: "MedMobile",
                newName: "Sessions",
                newSchema: "Identity");

            migrationBuilder.RenameTable(
                name: "RoleClaims",
                schema: "MedMobile",
                newName: "RoleClaims",
                newSchema: "Identity");

            migrationBuilder.RenameTable(
                name: "Role",
                schema: "MedMobile",
                newName: "Role",
                newSchema: "Identity");

            migrationBuilder.RenameTable(
                name: "Hospitals",
                schema: "MedMobile",
                newName: "Hospitals",
                newSchema: "Identity");

            migrationBuilder.RenameTable(
                name: "Fields",
                schema: "MedMobile",
                newName: "Fields",
                newSchema: "Identity");

            migrationBuilder.RenameTable(
                name: "Doctors",
                schema: "MedMobile",
                newName: "Doctors",
                newSchema: "Identity");

            migrationBuilder.RenameTable(
                name: "DoctorFields",
                schema: "MedMobile",
                newName: "DoctorField",
                newSchema: "Identity");

            migrationBuilder.RenameColumn(
                name: "CanceledBy",
                schema: "Identity",
                table: "Sessions",
                newName: "RejectedBy");

            migrationBuilder.RenameColumn(
                name: "PhoneNumber",
                schema: "Identity",
                table: "Hospitals",
                newName: "Number");

            migrationBuilder.RenameIndex(
                name: "IX_DoctorFields_FieldId",
                schema: "Identity",
                table: "DoctorField",
                newName: "IX_DoctorField_FieldId");

            migrationBuilder.RenameIndex(
                name: "IX_DoctorFields_DoctorId",
                schema: "Identity",
                table: "DoctorField",
                newName: "IX_DoctorField_DoctorId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_DoctorField",
                schema: "Identity",
                table: "DoctorField",
                column: "DoctorFieldId");

            migrationBuilder.AddForeignKey(
                name: "FK_DoctorField_Doctors_DoctorId",
                schema: "Identity",
                table: "DoctorField",
                column: "DoctorId",
                principalSchema: "Identity",
                principalTable: "Doctors",
                principalColumn: "DoctorId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_DoctorField_Fields_FieldId",
                schema: "Identity",
                table: "DoctorField",
                column: "FieldId",
                principalSchema: "Identity",
                principalTable: "Fields",
                principalColumn: "FieldId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
