package master.java.java_project.entity;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name="employees")

public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "firstName",nullable = false, length = 100)
    private String firstName;

    @Column(name = "lastName", nullable = false, length = 100)
    private String lastName;

    @Column(name = "email", nullable = false, unique = true, length = 150)
    private String email;

    @Column(name = "phoneNumber", length = 20)
    private String phoneNumber;

    @Column(name = "address", length = 255)
    private String address;

    @Enumerated(EnumType.STRING)
    @Column(name = "gender", length = 10)
    private Gender gender;

    private LocalDate hireDate;

    @Column(name = "jobTitle", length = 100)
    private String jobTitle;

    @Enumerated(EnumType.STRING)
    @Column(name = "department",length = 100)
    private Department department;

    @Enumerated(EnumType.STRING)
    @Column(name = "role", length = 50)
    private Role role;

    @Enumerated(EnumType.STRING)
    @Column(name="contratType",length = 50)
    private ContratType contratType;

    @Column(name = "salary")
    private Float salary;

    @Enumerated(EnumType.STRING)
    @Column(name = "status", length = 10)
    private Status status;


    @Column(name = "photoUrl",length = 100)
    private String photoUrl;


    public enum Gender {
        M, F
    }

    public enum Status {
        Actif, Congé, Résilié
    }

    public enum ContratType {
        CDI , CDD , Freelance
    }

    public enum Role {
        Manager , Employee
    }

    public enum Department {
        IT,HR,Finance , Marketing,Sales
    }
}
