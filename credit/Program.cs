using System.Reflection;
using credit.CriminalRecord;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.Hosting;
using MinimalApi.Endpoint.Extensions;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpoints();
builder.Services.AddFluentValidation(fv =>
{
    fv.LocalizationEnabled = false;
    fv.RegisterValidatorsFromAssembly(Assembly.GetExecutingAssembly());
});

builder.Services.AddScoped<ICheckCriminalRecord, CheckCriminalRecord>();

var app = builder.Build();

if (!app.Environment.IsDevelopment())
{
    app.UseHsts();
}

app.UseHttpsRedirection();
app.UseStaticFiles();
app.UseRouting();

app.MapFallbackToFile("index.html");
app.MapEndpoints();
app.Run();