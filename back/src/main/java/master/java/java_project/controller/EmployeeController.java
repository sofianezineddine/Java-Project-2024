package master.java.java_project.controller;


import lombok.AllArgsConstructor;
import master.java.java_project.dto.EmployeeDto;
import master.java.java_project.entity.Employee;
import master.java.java_project.mapper.EmployeeMapper;
import master.java.java_project.repository.EmployeeRepository;
import master.java.java_project.service.EmployeeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import  master.java.java_project.utils.JwtUtils;
import org.springframework.web.multipart.MultipartFile;


@CrossOrigin("*")
@AllArgsConstructor
@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    private  EmployeeService employeeService;
    private  EmployeeRepository employeeRepository;
    public JwtUtils JwtUtils;

    @PostMapping
    public ResponseEntity<EmployeeDto> createEmployee(@RequestBody EmployeeDto employeeDto){
        EmployeeDto savedEmployee= employeeService.createEmployee(employeeDto);
        return  new ResponseEntity<>(savedEmployee, HttpStatus.CREATED);
    }


    // build Get employee rest api
    @GetMapping("{id}")
    public ResponseEntity<EmployeeDto>  getEmployeeById(@PathVariable("id") Long employeeId){
        EmployeeDto employeeDto= employeeService.getEmployeeById(employeeId);
        return  ResponseEntity.ok(employeeDto);
    }


    // build Get all employees Rest API
    @GetMapping
    public ResponseEntity<List<EmployeeDto>>  getAllEmployees(){
        List<EmployeeDto> employees= employeeService.getAllEmployees();
        return  ResponseEntity.ok(employees);
    }

    // build update employee REST API
    @PutMapping("{id}")
    public ResponseEntity<EmployeeDto> updateEmployee(@PathVariable("id")   Long employeeid,@RequestBody  EmployeeDto updatedEmployee){

        EmployeeDto employeeDto=employeeService.updateEmployee(employeeid,updatedEmployee);
        return  ResponseEntity.ok(employeeDto);
    }


    // build delete employee rest api

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteEmployee(@PathVariable("id")  Long employeeId){
        employeeService.deleteEmployee(employeeId);
        return  ResponseEntity.ok("Employee deleted successfully");
    }

    @GetMapping("/search")
    public ResponseEntity<List<EmployeeDto>> searchEmployees(@RequestParam("name") String name) {
        List<EmployeeDto> employees = employeeService.searchEmployeesByName(name);
        return ResponseEntity.ok(employees);
    }

    @GetMapping("/filter")
    public ResponseEntity<List<EmployeeDto>> getFilteredEmployees(
            @RequestParam Map<String, Object> filters) {
        return ResponseEntity.ok(employeeService.getFilteredEmployees(filters));
    }


    // new

    @GetMapping("/me")
    public ResponseEntity<EmployeeDto> getCurrentEmployee(@RequestHeader("Authorization") String token) {
        String login = JwtUtils.extractUsername(token);
        Employee employee = employeeRepository.findByEmail(login)
                .orElseThrow(() -> new RuntimeException("Employee not found"));

        return ResponseEntity.ok(EmployeeMapper.mapToEmployeeDto(employee));
    }
    @PostMapping("/{id}/photo")
    public ResponseEntity<EmployeeDto> updateEmployeePhoto(
            @PathVariable("id") Long employeeId,
            @RequestParam("photo") MultipartFile photo) throws IOException {
        try {
            EmployeeDto updatedEmployee = employeeService.updateEmployeePhoto(employeeId, photo);
            return ResponseEntity.ok(updatedEmployee);
        } catch (Exception e) {
            System.err.println("Error updating employee photo: " + e.getMessage());
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(null);
        }
    }

}
