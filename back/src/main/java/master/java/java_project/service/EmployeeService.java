package master.java.java_project.service;

import master.java.java_project.dto.EmployeeDto;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

public interface EmployeeService {

    EmployeeDto createEmployee(EmployeeDto employeeDto);

    EmployeeDto getEmployeeById(Long employeeId);
//
    List<EmployeeDto> getAllEmployees();

    EmployeeDto updateEmployee(Long employeeId,EmployeeDto updatedEmployee);

    void deleteEmployee(Long employeeI);


    List<EmployeeDto> searchEmployeesByName(String name);


    List<EmployeeDto> getFilteredEmployees(Map<String, Object> filters);

    public EmployeeDto updateEmployeePhoto(Long employeeId, MultipartFile photo) throws IOException;

}
