using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using NewSarkariExam.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Options;

[Route("api/auth")]
[ApiController]
public class AuthController : ControllerBase
{
    private readonly IOptions<UserConfigSetting> appSettings;
    private IConfiguration _configuration;
    public AuthController(IConfiguration config, IOptions<UserConfigSetting> app)
    {
        this._configuration=config;
        this.appSettings=app;
    }
    // GET api/values
    [HttpPost, Route("login")]
    public IActionResult Login([FromBody]LoginModel user)
    {    
        if (user == null)
        {
            return BadRequest("Invalid client request");
        }
        if (user.UserName == appSettings.Value.UserName && user.Password == appSettings.Value.Password)
        {
            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("superSecretKey@345"));
            var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

            var tokeOptions = new JwtSecurityToken(
                issuer: appSettings.Value.Issuer,
                audience: appSettings.Value.Audience,//userSettings.Audience,
                claims: new List<System.Security.Claims.Claim>(),
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: signinCredentials
            );

            var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
            return Ok(new { Token = tokenString });
        }
        else
        {
            return Unauthorized();
        }
    }
}