using Microsoft.AspNetCore.Mvc;
using backend.Models;
using backend.Services;


namespace backend.Controllers;

[ApiController]
[Route("api/[controller]")]
public class TasksController : ControllerBase
{
    private readonly TaskService _taskService;

    public TasksController(TaskService taskService) =>
        _taskService = taskService;

    [HttpGet]
    public async Task<List<TaskItems>> Get() =>
        await _taskService.GetAsync();

    [HttpGet("{id:length(24)}")]
    public async Task<ActionResult<TaskItems>> Get(string id)
    {
        var task = await _taskService.GetAsync(id);

        if (task is null)
        {
            return NotFound();
        }

        return task;
    }

    [HttpPost]
    public async Task<IActionResult> Post(TaskItems newTask)
    {
        // Validar que los campos requeridos estén presentes
        if (string.IsNullOrWhiteSpace(newTask.Title))
        {
            return BadRequest("El título es requerido");
        }

        // Las fechas se manejan automáticamente en el servicio
        await _taskService.CreateAsync(newTask);
        return CreatedAtAction(nameof(Get), new { id = newTask.Id }, newTask);
    }

    [HttpPut("{id:length(24)}")]
    public async Task<IActionResult> Update(string id, TaskItems updatedTask)
    {
        var task = await _taskService.GetAsync(id);

        if (task is null)
        {
            return NotFound();
        }

        updatedTask.Id = task.Id;

        await _taskService.UpdateAsync(id, updatedTask);

        // Devolver la tarea actualizada
        var updatedTaskResult = await _taskService.GetAsync(id);
        return Ok(updatedTaskResult);
    }

    [HttpDelete("{id:length(24)}")]
    public async Task<IActionResult> Delete(string id)
    {
        var task = await _taskService.GetAsync(id);

        if (task is null)
        {
            return NotFound();
        }

        await _taskService.RemoveAsync(id);

        return NoContent();
    }
}
