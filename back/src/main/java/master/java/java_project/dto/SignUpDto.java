package master.java.java_project.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Getter
@Setter
public class SignUpDto {
    @NotEmpty
    private Long id;
    @NotEmpty
    private String firstName;
    @NotEmpty
    private String lastName;
    @NotEmpty
    private String login;
    @NotEmpty
    private String password;

    @NotEmpty
    private String role; // Add this field
}