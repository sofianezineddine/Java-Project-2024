package master.java.java_project.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import master.java.java_project.entity.User;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UserDto {
    private Long id;
    private String firstName;
    private String lastName;
    private String login;
    private String token;
    private String role; // Add role field

    public UserDto(Long id, String firstName, String lastName, String login, String token, User.Role role) {
    }
}