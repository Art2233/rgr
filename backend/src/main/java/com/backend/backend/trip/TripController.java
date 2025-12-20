package com.backend.backend.trip;

import jakarta.servlet.http.HttpSession;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;

@RestController
@RequestMapping("/api/trip")
@CrossOrigin(
        origins = "http://localhost:4200",
        allowCredentials = "true"
) //for development
public class TripController {
    private TripService tripService;

    public TripController(TripService tripService) {
        this.tripService = tripService;
    }

    @GetMapping("/get-list")
    public Object getTripList(HttpSession session) throws Exception {
        if (session.getAttribute("userId") == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }
        return tripService.getTrips();
    }

    @PostMapping("/new")
    public Object newTrip(@RequestBody Trip trip, HttpSession session) throws SQLException {
        try {
            if("USER".equals(session.getAttribute("role"))) {
                return ResponseEntity
                        .status(HttpStatus.FORBIDDEN)
                        .build();
            }
            return  tripService.createNewTrip(trip);
        } catch (Exception e) {
            throw new SQLException(e);
        }
    }

    @PutMapping("/update/{id}")
    public Object updateTrip(@RequestBody Trip trip, @PathVariable int id, HttpSession session) throws SQLException {
        try {
            if("USER".equals(session.getAttribute("role"))) {
                return ResponseEntity
                        .status(HttpStatus.FORBIDDEN)
                        .build();
            }
            return tripService.updateTrip(id, trip);
        }  catch (Exception e) {
            throw new SQLException(e);
        }
    }

    @DeleteMapping("/delete/{id}")
    public Object deleteTrip(@PathVariable String id, HttpSession session) throws SQLException {
        try {
            if("USER".equals(session.getAttribute("role"))) {
                return ResponseEntity
                        .status(HttpStatus.FORBIDDEN)
                        .build();
            }
            tripService.deleteTrip(Integer.parseInt(id));
        } catch (Exception e) {
            throw new SQLException(e);
        }

        return null;
    }
}
