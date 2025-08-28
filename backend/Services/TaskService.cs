using Microsoft.Extensions.Options;
using MongoDB.Driver;
using backend.Models;


namespace backend.Services
{
    using Microsoft.Extensions.Configuration;
    public class TaskService
    {
        private readonly IMongoCollection<TaskItems> _tasksCollection;

        public TaskService(IOptions<DataBaseSettings> databaseSettings)
        {
            // Usar directamente los valores ya configurados desde variables de entorno
            var connectionString = databaseSettings.Value.ConnectionString;
            var databaseName = databaseSettings.Value.DatabaseName;
            var collectionName = databaseSettings.Value.TasksCollectionName;

            // Debug: verificar valores
            Console.WriteLine($"Connection: {connectionString}");
            Console.WriteLine($"Database: {databaseName}");
            Console.WriteLine($"Collection: {collectionName}");

            // Validar que la cadena de conexión no esté vacía
            if (string.IsNullOrEmpty(connectionString))
            {
                throw new ArgumentException("MongoDB connection string is not configured");
            }

            var mongoClient = new MongoClient(connectionString);
            var mongoDatabase = mongoClient.GetDatabase(databaseName);
            _tasksCollection = mongoDatabase.GetCollection<TaskItems>(collectionName);
        }

        public async Task<List<TaskItems>> GetAsync() =>
            await _tasksCollection.Find(_ => true).ToListAsync();

        public async Task<TaskItems?> GetAsync(string id) =>
            await _tasksCollection.Find(x => x.Id == id).FirstOrDefaultAsync();

        public async Task CreateAsync(TaskItems newTask)
        {
            newTask.CreatedAt = DateTime.UtcNow;
            newTask.UpdatedAt = DateTime.UtcNow;
            await _tasksCollection.InsertOneAsync(newTask);
        }

        public async Task UpdateAsync(string id, TaskItems updatedTask)
        {
            updatedTask.UpdatedAt = DateTime.UtcNow;
            await _tasksCollection.ReplaceOneAsync(x => x.Id == id, updatedTask);
        }

        public async Task RemoveAsync(string id) =>
            await _tasksCollection.DeleteOneAsync(x => x.Id == id);
    }
}
