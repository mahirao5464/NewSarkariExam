using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using NewSarkariExam.Models;
using Microsoft.Extensions.Configuration;
[Route("api/auth")]
[ApiController]
public class AuthController : ControllerBase
{
    private IConfiguration _configuration;
    public AuthController(IConfiguration config)
    {
        this._configuration=config;
    }
    // GET api/values
    [HttpPost, Route("login")]
    public IActionResult Login([FromBody]LoginModel user)
    {    
        if (user == null)
        {
            return BadRequest("Invalid client request");
        }
            var userSettings= _configuration.GetValue<UserConfigSetting>("User");
        if (user.UserName == "Mahipal" && user.Password == "Mahipal")
        {
            var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("superSecretKey@345"));
            var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

            var tokeOptions = new JwtSecurityToken(
                issuer: "http://localhost:5000",//userSettings.Issuer,
                audience: "http://localhost:5000",//userSettings.Audience,
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