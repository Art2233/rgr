package com.backend.backend.station;

import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;

@RestController
@RequestMapping("api/station")
@CrossOrigin(
        origins = "http://localhost:4200",
        allowCredentials = "true"
) //for development
public class StationController {
    private final StationService stationService;

    public StationController(StationService stationService) {
        this.stationService = stationService;
    }

    @GetMapping("/get-list")
    public Object getStation(HttpSession session) throws Exception {
        if (session.getAttribute("userId") == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        return stationService.getStations();
    }

    @PostMapping("/new")
    public Object createStation(@RequestBody Station station, HttpSession session) throws Exception {
        try {
            if("USER".equals(session.getAttribute("role"))) {
                return ResponseEntity
                        .status(HttpStatus.FORBIDDEN)
                        .build();
            }
            return stationService.createNewStation(station);
        } catch (Exception e) {
            throw e;
        }
    }

    @PutMapping("/update/{id}")
    public Object updateStation(@PathVariable String id,  @RequestBody Station station, HttpSession session) throws Exception {
        try {
            if("USER".equals(session.getAttribute("role"))) {
                return ResponseEntity
                        .status(HttpStatus.FORBIDDEN)
                        .build();
            }
            return stationService.updateStation(Integer.parseInt(id), station);
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
    }

    @DeleteMapping("/delete/{id}")
    public Object deleteStation(@PathVariable Integer id, HttpSession session) throws Exception {
        try {
            if("USER".equals(session.getAttribute("role"))) {
                return ResponseEntity
                        .status(HttpStatus.FORBIDDEN)
                        .build();
            }
            stationService.deleteStation(id);
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }

        return null;
    }
}
