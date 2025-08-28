
using backend.Models;
using backend.Services;
using DotNetEnv;

namespace backend
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Cargar variables de entorno AL INICIO
            Env.Load();

            builder.Services.Configure<DataBaseSettings>(options =>
            {
                options.ConnectionString = Environment.GetEnvironmentVariable("MONGODB_CONNECTION_STRING");
                options.DatabaseName = Environment.GetEnvironmentVariable("MONGODB_DATABASE_NAME");
                options.TasksCollectionName = Environment.GetEnvironmentVariable("MONGODB_COLLECTION_NAME");
            });

            builder.Services.AddSingleton<TaskService>();

            builder.Services.AddControllers();

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            // Add CORS
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowReactApp",
                    builder => builder
                        .WithOrigins("http://localhost:3000", "http://localhost:5173") // URLs de React y Vite
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .AllowCredentials());
            });

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseCors("AllowReactApp");

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}
