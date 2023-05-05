using Microsoft.EntityFrameworkCore;
using TodoApi.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers().AddXmlSerializerFormatters();
// add ability to output xml

builder.Services.AddCors(opt =>
{
    opt.AddPolicy("AllowAll",
    builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
});

//builder.Services.AddDbContext<TodoContext>(opt => opt.UseInMemoryDatabase("todo"));

builder.Services.AddDbContextFactory<TodoContext>(
    options => options.UseSqlite(builder.Configuration.GetConnectionString("TodoConnection")));

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAll");
app.UseHttpsRedirection();

app.UseDefaultFiles();
app.UseStaticFiles();

app.UseAuthorization();

app.MapControllers();
app.Run();
