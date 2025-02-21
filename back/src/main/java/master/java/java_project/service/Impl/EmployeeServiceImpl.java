package master.java.java_project.service.Impl;

import lombok.AllArgsConstructor;
import master.java.java_project.dto.EmployeeDto;
import master.java.java_project.entity.Employee;
import master.java.java_project.entity.User;
import master.java.java_project.exception.ResourceNotFoundException;
import master.java.java_project.mapper.EmployeeMapper;
import master.java.java_project.repository.EmployeeRepository;
import master.java.java_project.repository.UserRepository;
import master.java.java_project.service.EmployeeService;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.CharBuffer;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@AllArgsConstructor
@Service
public class EmployeeServiceImpl implements EmployeeService {

    private EmployeeRepository employeeRepository;
    private UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;


    @Override
    public EmployeeDto createEmployee(EmployeeDto employeeDto) {
        // Map DTO to entity
        Employee employee = EmployeeMapper.maptoEmployee(employeeDto);

        // Save the employee
        Employee savedEmployee = employeeRepository.save(employee);

        // Create a user for the employee
        User user = new User();
        user.setFirstName(employee.getFirstName());
        user.setLastName(employee.getLastName());
        user.setLogin(employee.getEmail()); // Use email as login
        user.setPassword(passwordEncoder.encode(CharBuffer.wrap(employee.getEmail()))); // Use email as password (for now)
        user.setRole(User.Role.EMPLOYEE); // Set the role to EMPLOYEE
        userRepository.save(user);

        return EmployeeMapper.mapToEmployeeDto(savedEmployee);
    }
    @Override
    public EmployeeDto getEmployeeById(Long employeeId) {
        Employee employee= employeeRepository.findById(employeeId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee is not found with given id"+employeeId));

        return EmployeeMapper.mapToEmployeeDto(employee);
    }

    @Override
    public List<EmployeeDto> getAllEmployees() {
        List<Employee> employees= employeeRepository.findAll();
        return employees.stream().map(EmployeeMapper::mapToEmployeeDto)
                .collect(Collectors.toList());
    }

    @Override
    public EmployeeDto updateEmployee(Long employeeId, EmployeeDto updatedEmployee) {

        Employee employee = employeeRepository.findById(employeeId).orElseThrow(
                () -> new ResourceNotFoundException("Employee is not exists with given id"+employeeId)
        );

        employee.setFirstName(updatedEmployee.getFirstName());
        employee.setLastName(updatedEmployee.getLastName());
        employee.setEmail(updatedEmployee.getEmail());
        employee.setPhoneNumber(updatedEmployee.getPhoneNumber());
        employee.setAddress(updatedEmployee.getAddress());
        employee.setGender(updatedEmployee.getGender());
        employee.setDepartment(updatedEmployee.getDepartment());
        employee.setRole(updatedEmployee.getRole());
        employee.setContratType(updatedEmployee.getContratType());
        employee.setSalary(updatedEmployee.getSalary());
        employee.setStatus(updatedEmployee.getStatus());
        employee.setHireDate(updatedEmployee.getHireDate());
        employee.setJobTitle(updatedEmployee.getJobTitle());

        Employee updatedEmployeeObj= employeeRepository.save(employee);

        return EmployeeMapper.mapToEmployeeDto(updatedEmployeeObj);
    }

    @Override
    public void deleteEmployee(Long employeeId) {
        Employee employee = employeeRepository.findById(employeeId).orElseThrow(
                () -> new ResourceNotFoundException("Employee is not exists with given id"+employeeId)
        );
        employeeRepository.deleteById(employeeId);

    }

    @Override
    public List<EmployeeDto> searchEmployeesByName(String name) {
        List<Employee> employees = employeeRepository.findByName(name);
        return employees.stream().map(EmployeeMapper::mapToEmployeeDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<EmployeeDto> getFilteredEmployees(Map<String, Object> filters) {
        Specification<Employee> spec = Specification.where(null);

        // Apply filters dynamically
        if (filters.containsKey("department") && !filters.get("department").toString().isEmpty()) {
            spec = spec.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.equal(root.get("department"), filters.get("department")));
        }
        if (filters.containsKey("role") && !filters.get("role").toString().isEmpty()) {
            spec = spec.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.equal(root.get("role"), filters.get("role")));
        }
        if (filters.containsKey("status") && !filters.get("status").toString().isEmpty()) {
            spec = spec.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.equal(root.get("status"), filters.get("status")));
        }
        if (filters.containsKey("gender") && !filters.get("gender").toString().isEmpty()) {
            spec = spec.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.equal(root.get("gender"), filters.get("gender")));
        }
        if (filters.containsKey("contratType") && !filters.get("contratType").toString().isEmpty()) {
            spec = spec.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.equal(root.get("contratType"), filters.get("contratType")));
        }

        List<Employee> filteredEmployees = employeeRepository.findAll(spec);
        return filteredEmployees.stream().map(EmployeeMapper::mapToEmployeeDto).collect(Collectors.toList());
    }


    // new
    @Override
    public EmployeeDto updateEmployeePhoto(Long employeeId, MultipartFile photo) throws IOException {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new ResourceNotFoundException("Employee not found"));

        // Save the photo to a directory or cloud storage
        String photoUrl = savePhoto(photo);

        // Update the employee's photo URL
        employee.setPhotoUrl(photoUrl);
        Employee updatedEmployee = employeeRepository.save(employee);

        return EmployeeMapper.mapToEmployeeDto(updatedEmployee);
    }


    private String savePhoto(MultipartFile photo) throws IOException {
        // Implement logic to save the photo (e.g., to a directory or cloud storage)
        // Return the URL of the saved photo
        return "/photos/" + photo.getOriginalFilename();
    }


}
