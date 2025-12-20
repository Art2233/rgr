package com.backend.backend.user;

import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;

@RestController
@RequestMapping("api")
@CrossOrigin(
        origins = "http://localhost:4200",
        allowCredentials = "true"
) //for development
public class UserController {
    private final LoginService loginService;

    public UserController(LoginService loginService) {
        this.loginService = loginService;
    }

    @PostMapping("/login")
    public Object login(@RequestBody LoginRequest request, HttpSession session) throws SQLException {
        User user = loginService.login(
            request.userName,
            request.password
        );

        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        session.setAttribute("userId", user.getId());
        session.setAttribute("username", request.userName);
        session.setAttribute("role", user.getRole());

        return user;
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(HttpSession session) {
        session.invalidate();
        return ResponseEntity.ok().build();
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody LoginRequest request, HttpSession session) throws SQLException  {
        User user = loginService.register(
            request.userName,
            request.password
        );

        session.setAttribute("userId", user.getId());
        session.setAttribute("username", user.getUserName());
        session.setAttribute("role", user.getRole());

        return ResponseEntity.ok(user);
    }

    @GetMapping("/get-users")
    public Object getUsers(HttpSession session) {
        if(session.getAttribute("userId") == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        if("USER".equals(session.getAttribute("role"))) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        return loginService.getUsers();
    }

    @PutMapping("/set-admin-user/{id}")
    public Object setAdminUser(@PathVariable String id, HttpSession session) {
        if(session.getAttribute("userId") == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        if("USER".equals(session.getAttribute("role"))) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }

        this.loginService.setAdminUser(Integer.parseInt(id));

        return null;
    }
}
