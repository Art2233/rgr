package com.backend.backend.city;

import com.backend.backend.connection.DBConnection;
import org.springframework.web.bind.annotation.*;

import java.sql.Connection;
import java.sql.SQLException;
import java.sql.Statement;

@RestController
@RequestMapping("/api/city")
@CrossOrigin(origins = "http://localhost:4200")
public class CityController {

    @PostMapping("/noninjection")
    public String noninjection(@RequestBody String sql) {
        Connection conn = null;
        Statement stmt = null;
        String result = "";

        try {
            conn = DBConnection.getConnection();

            if (conn == null) {
                return "Error: Could not establish DB connection.";
            }

            stmt = conn.createStatement();

            boolean hasResultSet = stmt.execute(sql);

            result = "Query executed successfully";

        } catch (SQLException e) {

            return "SQL Error: " + e.getMessage();
        } finally {

            try {
                if (stmt != null) stmt.close();
                if (conn != null) conn.close();
            } catch (SQLException e) {

            }
        }

        return result;
    }
}
