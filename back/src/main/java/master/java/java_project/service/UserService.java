package master.java.java_project.service;



import master.java.java_project.dto.CredentialsDto;
import master.java.java_project.dto.SignUpDto;
import master.java.java_project.dto.UserDto;
import master.java.java_project.entity.User;
import master.java.java_project.mapper.UserMapper;
import master.java.java_project.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import master.java.java_project.exception.AppException;
import java.nio.CharBuffer;
import java.util.Optional;


@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }




    public UserDto login(CredentialsDto credentialsDto) {
        User user = userRepository.findByLogin(credentialsDto.getLogin())
                .orElseThrow(() -> new AppException("Unknown user", HttpStatus.NOT_FOUND));
        if (passwordEncoder.matches(CharBuffer.wrap(credentialsDto.getPassword()), user.getPassword())) {
            return UserMapper.toUserDto(user); // Ensure the role is included
        }
        throw new AppException("Invalid password", HttpStatus.BAD_REQUEST);
    }

    public UserDto register(SignUpDto userDto) {
        Optional<User> optionalUser = userRepository.findByLogin(userDto.getLogin());

        if (optionalUser.isPresent()) {
           throw new AppException("Login already exists", HttpStatus.BAD_REQUEST);
            }

        User user= UserMapper.signUpToUser((userDto));
        user.setPassword(passwordEncoder.encode(CharBuffer.wrap(userDto.getPassword())));
        user.setRole(User.Role.valueOf(userDto.getRole())); // Set the role
        User savedUser= userRepository.save(user);
        return  UserMapper.toUserDto(savedUser);
    }

    public UserDto findByLogin(String login) {
        User user = userRepository.findByLogin(login)
                .orElseThrow(() -> new AppException("Unknown user", HttpStatus.NOT_FOUND));
        return UserMapper.toUserDto(user);
    }

}