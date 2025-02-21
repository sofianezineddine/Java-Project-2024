package master.java.java_project.service.Impl;

import lombok.AllArgsConstructor;
import master.java.java_project.dto.TaskDto;
import master.java.java_project.entity.Employee;
import master.java.java_project.entity.Task;
import master.java.java_project.exception.ResourceNotFoundException;
import master.java.java_project.mapper.TaskMapper;
import master.java.java_project.repository.EmployeeRepository;
import master.java.java_project.repository.TaskRepository;
import master.java.java_project.service.TaskService;
import org.springframework.stereotype.Service;
import master.java.java_project.repository.TaskSpecification;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
import java.util.HashSet;
import java.util.Set;

@Service
@AllArgsConstructor
public class TaskServiceImpl implements TaskService {

    private TaskRepository taskRepository;
    private EmployeeRepository employeeRepository;


    public void TaskService(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @Override
    public TaskDto createTask(TaskDto taskDto) {
        Task task = TaskMapper.mapToTask(taskDto);
        Set<Employee> employees = new HashSet<>(employeeRepository.findAllById(taskDto.getAssignedEmployeeIds()));
        task.setAssignedEmployees(employees);
        Task savedTask = taskRepository.save(task);
        return TaskMapper.mapToTaskDto(savedTask);
    }

    @Override
    public TaskDto getTaskById(Long taskId) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found with id: " + taskId));
        return TaskMapper.mapToTaskDto(task);
    }

    @Override
    public List<TaskDto> getAllTasks() {
        List<Task> tasks = taskRepository.findAll();
        return tasks.stream().map(TaskMapper::mapToTaskDto).collect(Collectors.toList());
    }

    @Override
    public TaskDto updateTask(Long taskId, TaskDto taskDto) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found with id: " + taskId));
        task.setTitle(taskDto.getTitle());
        task.setDescription(taskDto.getDescription());
        task.setDueDate(taskDto.getDueDate());
        task.setStatus(Task.TaskStatus.valueOf(taskDto.getStatus()));
        Set<Employee> employees = new HashSet<>(employeeRepository.findAllById(taskDto.getAssignedEmployeeIds()));
        task.setAssignedEmployees(employees);
        Task updatedTask = taskRepository.save(task);
        return TaskMapper.mapToTaskDto(updatedTask);
    }

    @Override
    public void deleteTask(Long taskId) {
        taskRepository.deleteById(taskId);
    }

    @Override
    public List<TaskDto> searchTasksByTitle(String title) {
        List<Task> tasks = taskRepository.findByTitleContainingIgnoreCase(title);
        return tasks.stream().map(TaskMapper::mapToTaskDto).collect(Collectors.toList());
    }

    @Override
    public List<TaskDto> getFilteredTasks(Map<String, Object> filters) {
        Specification<Task> spec = Specification.where(null);

        if (filters.containsKey("status") && !filters.get("status").toString().isEmpty()) {
            spec = spec.and(TaskSpecification.hasStatus(filters.get("status").toString()));
        }

        if (filters.containsKey("assignedEmployee") && !filters.get("assignedEmployee").toString().isEmpty()) {
            String assignedEmployeeName = filters.get("assignedEmployee").toString();
            spec = spec.and(TaskSpecification.hasAssignedEmployeeName(assignedEmployeeName));
        }

        return taskRepository.findAll(spec).stream()
                .map(TaskMapper::mapToTaskDto)
                .collect(Collectors.toList());
    }

    // new
    @Override
    public List<TaskDto> getTasksByEmployee(Long employeeId) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found with id: " + employeeId));
        List<Task> tasks = taskRepository.findByAssignedEmployeesContaining(employee);
        return tasks.stream()
                .map(TaskMapper::mapToTaskDto)
                .collect(Collectors.toList());
    }
    @Override
    public TaskDto completeTask(Long taskId) {
        Task task = taskRepository.findById(taskId)
                .orElseThrow(() -> new ResourceNotFoundException("Task not found with id: " + taskId));
        task.setStatus(Task.TaskStatus.COMPLETED);
        Task updatedTask = taskRepository.save(task);
        return TaskMapper.mapToTaskDto(updatedTask);
    }




}


