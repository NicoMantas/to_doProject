using Microsoft.Extensions.Options;
using MongoDB.Driver;
using backend.Models;

namespace backend.Services
{
    public class TaskService
    {
        private readonly IMongoCollection<TaskItems> _tasksCollection;

        public TaskService(IOptions<DataBaseSettings> databaseSettings)
        {
            var mongoClient = new MongoClient(databaseSettings.Value.ConnectionString);
            var mongoDatabase = mongoClient.GetDatabase(databaseSettings.Value.DatabaseName);
            _tasksCollection = mongoDatabase.GetCollection<TaskItems>(databaseSettings.Value.TasksCollectionName);
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
