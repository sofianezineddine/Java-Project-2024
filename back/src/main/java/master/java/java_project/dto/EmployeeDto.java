package master.java.java_project.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import master.java.java_project.entity.Employee;

import java.time.LocalDate;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

public class EmployeeDto {

    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private  String phoneNumber;
    private String address;
    private Employee.Gender gender;
    private LocalDate hireDate;
    private String jobTitle;
    private Employee.Department department;
    private Employee.Role role;
    private Employee.ContratType contratType;
    private Float salary ;
    private Employee.Status status;
    private String photoUrl; // Add this field
}
