package master.java.java_project.repository;

import master.java.java_project.entity.Task;
import org.springframework.data.jpa.domain.Specification;

public class TaskSpecification {
    public static Specification<Task> hasStatus(String status) {
        return (root, query, criteriaBuilder) -> {
            if (status == null || status.isEmpty()) {
                return criteriaBuilder.conjunction(); // No filter
            }
            return criteriaBuilder.equal(root.get("status"), Task.TaskStatus.valueOf(status));
        };
    }

    public static Specification<Task> hasAssignedEmployeeName(String employeeName) {
        return (root, query, criteriaBuilder) -> {
            if (employeeName == null || employeeName.isEmpty()) {
                return criteriaBuilder.conjunction(); // No filter
            }
            return criteriaBuilder.like(
                    criteriaBuilder.lower(root.join("assignedEmployees").get("firstName")),
                    "%" + employeeName.toLowerCase() + "%"
            );
        };
    }
}