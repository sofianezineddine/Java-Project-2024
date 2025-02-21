package master.java.java_project.mapper;

import master.java.java_project.entity.Employee;
import master.java.java_project.dto.EmployeeDto;

public class EmployeeMapper {

    public static EmployeeDto mapToEmployeeDto(Employee employee) {
        return new EmployeeDto(
                employee.getId(),
                employee.getFirstName(),
                employee.getLastName(),
                employee.getEmail(),
                employee.getPhoneNumber(),
                employee.getAddress(),
                employee.getGender(),
                employee.getHireDate(),
                employee.getJobTitle(),
                employee.getDepartment(),
                employee.getRole(),
                employee.getContratType(),
                employee.getSalary(),
                employee.getStatus(),
                employee.getPhotoUrl() // Map the photo URL
        );
    }

    public static Employee maptoEmployee(EmployeeDto employeeDto) {
        return new Employee(
                employeeDto.getId(),
                employeeDto.getFirstName(),
                employeeDto.getLastName(),
                employeeDto.getEmail(),
                employeeDto.getPhoneNumber(),
                employeeDto.getAddress(),
                employeeDto.getGender(),
                employeeDto.getHireDate(),
                employeeDto.getJobTitle(),
                employeeDto.getDepartment(),
                employeeDto.getRole(),
                employeeDto.getContratType(),
                employeeDto.getSalary(),
                employeeDto.getStatus(),
                employeeDto.getPhotoUrl() // Map the photo URL
        );

    }

}
