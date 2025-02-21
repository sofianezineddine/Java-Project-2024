package master.java.java_project.service;

import master.java.java_project.dto.TaskDto;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;
import java.util.Map;

public interface TaskService {
    TaskDto createTask(TaskDto taskDto);
    TaskDto getTaskById(Long taskId);
    List<TaskDto> getAllTasks();
    TaskDto updateTask(Long taskId, TaskDto taskDto);
    void deleteTask(Long taskId);
    List<TaskDto> searchTasksByTitle(String title);
    public List<TaskDto> getFilteredTasks(Map<String, Object> filters);
    List<TaskDto> getTasksByEmployee(Long employeeId);
    TaskDto completeTask(Long taskId);
}