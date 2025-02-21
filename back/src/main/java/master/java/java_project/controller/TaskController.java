package master.java.java_project.controller;

import lombok.AllArgsConstructor;
import master.java.java_project.dto.TaskDto;
import master.java.java_project.service.TaskService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    private TaskService taskService;
    public void TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @PostMapping
    public ResponseEntity<TaskDto> createTask(@RequestBody TaskDto taskDto) {
        TaskDto savedTask = taskService.createTask(taskDto);
        return new ResponseEntity<>(savedTask, HttpStatus.CREATED);
    }

    @GetMapping("{id}")
    public ResponseEntity<TaskDto> getTaskById(@PathVariable("id") Long taskId) {
        TaskDto taskDto = taskService.getTaskById(taskId);
        return ResponseEntity.ok(taskDto);
    }

    @GetMapping
    public ResponseEntity<List<TaskDto>> getAllTasks() {
        List<TaskDto> tasks = taskService.getAllTasks();
        return ResponseEntity.ok(tasks);
    }

    @PutMapping("{id}")
    public ResponseEntity<TaskDto> updateTask(@PathVariable("id") Long taskId, @RequestBody TaskDto taskDto) {
        TaskDto updatedTask = taskService.updateTask(taskId, taskDto);
        return ResponseEntity.ok(updatedTask);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteTask(@PathVariable("id") Long taskId) {
        taskService.deleteTask(taskId);
        return ResponseEntity.ok("Task deleted successfully");
    }

    @GetMapping("/search")
    public ResponseEntity<List<TaskDto>> searchTasks(@RequestParam("title") String title) {
        List<TaskDto> tasks = taskService.searchTasksByTitle(title);
        return ResponseEntity.ok(tasks);
    }

    @GetMapping("/filter")
    public ResponseEntity<List<TaskDto>> getFilteredTasks(@RequestParam Map<String, Object> filters) {
        List<TaskDto> tasks = taskService.getFilteredTasks(filters);
        return ResponseEntity.ok(tasks);
    }


    // new
    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<List<TaskDto>> getTasksByEmployee(@PathVariable("employeeId") Long employeeId) {
        List<TaskDto> tasks = taskService.getTasksByEmployee(employeeId);
        return ResponseEntity.ok(tasks);
    }
    @PutMapping("/complete/{taskId}")
    public ResponseEntity<TaskDto> completeTask(@PathVariable("taskId") Long taskId) {
        TaskDto updatedTask = taskService.completeTask(taskId);
        return ResponseEntity.ok(updatedTask);
    }
}