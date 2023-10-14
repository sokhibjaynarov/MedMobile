// --------------------------------------------------------------- 
// Copyright (c) DevZilla team
// ---------------------------------------------------------------

using MedMobile.Api.Brokers.Loggings;
using MedMobile.Api.Brokers.UserManagement;
using MedMobile.Api.Models.Users;
using MedMobile.Api.ViewModels.Identity;
using MedMobile.Api.ViewModels.Users;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace MedMobile.Api.Services.Identity
{
    public class IdentityService : IIdentityService
    {
        private readonly IUserManagementBroker userManagementBroker;
        private readonly ILoggingBroker loggingBroker;
        private readonly IConfiguration configuration;

        public IdentityService(ILoggingBroker loggingBroker, IUserManagementBroker userManagementBroker, IConfiguration configuration)
        {
            this.loggingBroker = loggingBroker;
            this.userManagementBroker = userManagementBroker;
            this.configuration = configuration;
        }

        public async ValueTask<GeneratedTokenViewModel> GenerateTokenAsync(CreateTokenViewModel createTokenView)
        {
            try
            {
                var response = new GeneratedTokenViewModel();

                var user = await this.userManagementBroker.SelectAllUsers().
                    FirstOrDefaultAsync(u => u.Email.ToLower() == createTokenView.Email.ToLower());

                if (user == null)
                {
                    throw new Exception();
                }

                var checkPassword = await this.userManagementBroker.CheckPasswordAsync(user, createTokenView.Password);

                if (!checkPassword)
                {
                    throw new Exception();
                }

                var userRoles = await this.userManagementBroker.SelectAllUserRolesAsync(user);

                var authClaims = new List<Claim>
                {
                    new Claim(ClaimTypes.Name, user.UserName),
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                    new Claim("FirstName", user.FirstName),
                    new Claim("LastName", user.LastName),
                };

                foreach (var userRole in userRoles)
                {
                    authClaims.Add(new Claim("role", userRole));
                }

                var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JWT:Secret"]));

                var token = new JwtSecurityToken(
                    issuer: configuration["JWT:ValidIssuer"],
                    audience: configuration["JWT:ValidAudience"],
                    expires: DateTime.Now.AddHours(3),
                    claims: authClaims,
                    signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                    );

                response.ExpirationData = token.ValidTo;
                response.Token = new JwtSecurityTokenHandler().WriteToken(token);
                response.User = new UserForLoginResponseViewModel()
                {
                    FatherName = user.FatherName,
                    LastName = user.LastName,
                    FirstName = user.FirstName,
                    PassportNumber = user.PassportNumber,
                    UserId = user.Id
                };

                return response;
            }
            catch (Exception ex)
            {
                this.loggingBroker.LogError(ex);
                throw;
            }
        }
    }
}
