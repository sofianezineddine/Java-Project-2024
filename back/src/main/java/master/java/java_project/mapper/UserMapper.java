package master.java.java_project.mapper;

import master.java.java_project.dto.SignUpDto;
import master.java.java_project.dto.UserDto;
import master.java.java_project.entity.User;

public class UserMapper {
    public static UserDto toUserDto(User user) {
        return new UserDto(
                user.getId(),
                user.getFirstName(),
                user.getLastName(),
                user.getLogin(),
                null, // Password is not included in the response
                user.getRole() != null ? user.getRole().name() : null // Map the role
        );
    }
    public static User signUpToUser(SignUpDto signUpDto) {
        return new User(
                signUpDto.getId(),
                signUpDto.getFirstName(),
                signUpDto.getLastName(),
                signUpDto.getLogin(),
                signUpDto.getPassword(),
                signUpDto.getRole() // Map the role
        );
    }
}