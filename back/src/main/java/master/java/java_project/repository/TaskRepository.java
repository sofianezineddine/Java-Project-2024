package master.java.java_project.repository;

import master.java.java_project.entity.Employee;
import master.java.java_project.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> , JpaSpecificationExecutor<Task> {
    // Custom query using @Query annotation
    @Query("SELECT t FROM Task t WHERE LOWER(t.title) LIKE LOWER(CONCAT('%', :title, '%'))")
    List<Task> findByTitleContainingIgnoreCase(@Param("title") String title);
    @Query("SELECT t FROM Task t WHERE :employee MEMBER OF t.assignedEmployees")
    List<Task> findByAssignedEmployeesContaining(@Param("employee") Employee employee);


}
