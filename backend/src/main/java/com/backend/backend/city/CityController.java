package com.backend.backend.city;

import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.Map;

@RestController
@RequestMapping("/api/city")
@CrossOrigin(
    origins = "http://localhost:4200",
    allowCredentials = "true"
) //for development
public class CityController {
    private final CityService cityService;
    public CityController(CityService cityService) {
        this.cityService = cityService;
    }

    @GetMapping("/get-list")
    public Object getCities(HttpSession session) throws SQLException {
        if (session.getAttribute("userId") == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        return cityService.getCities();
    }

    @PostMapping("/new")
    public Object createCity(@RequestBody Map<String, String> body, HttpSession session) {
        String name = body.get("name");
        try {
            if("USER".equals(session.getAttribute("role"))) {
                return ResponseEntity
                        .status(HttpStatus.FORBIDDEN)
                        .build();
            }
            return cityService.createNewCity(name);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    @PutMapping("/update/{id}")
    public Object updateCity(@PathVariable String id,  @RequestBody City city, HttpSession session) {
        try {
            if("USER".equals(session.getAttribute("role"))) {
                return ResponseEntity
                    .status(HttpStatus.FORBIDDEN)
                    .build();
            }
            return cityService.updateCity(Math.toIntExact(city.getId()), city.getName());
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    @DeleteMapping("/delete/{id}")
    public Object deleteCity(@PathVariable String id, HttpSession session) {
        try {
            if("USER".equals(session.getAttribute("role"))) {
                return ResponseEntity
                        .status(HttpStatus.FORBIDDEN)
                        .build();
            }
            cityService.deleteCity(Integer.parseInt(id));
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
        return null;
    }
}
