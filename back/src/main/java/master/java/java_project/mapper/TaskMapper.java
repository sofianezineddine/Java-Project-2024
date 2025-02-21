package master.java.java_project.mapper;

import master.java.java_project.dto.TaskDto;
import master.java.java_project.entity.Employee;
import master.java.java_project.entity.Task;

import java.util.stream.Collectors;

public class TaskMapper {
    public static Task mapToTask(TaskDto taskDto) {
        Task task = new Task();
        task.setId(taskDto.getId());
        task.setTitle(taskDto.getTitle());
        task.setDescription(taskDto.getDescription());
        task.setDueDate(taskDto.getDueDate());
        task.setStatus(Task.TaskStatus.valueOf(taskDto.getStatus()));
        return task;
    }

    public static TaskDto mapToTaskDto(Task task) {
        TaskDto taskDto = new TaskDto();
        taskDto.setId(task.getId());
        taskDto.setTitle(task.getTitle());
        taskDto.setDescription(task.getDescription());
        taskDto.setDueDate(task.getDueDate());
        taskDto.setStatus(task.getStatus().name());
        taskDto.setAssignedEmployeeIds(task.getAssignedEmployees().stream()
                .map(Employee::getId)
                .collect(Collectors.toSet()));
        return taskDto;
    }
}