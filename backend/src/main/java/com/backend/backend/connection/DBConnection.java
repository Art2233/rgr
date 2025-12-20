package com.backend.backend.connection;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Properties;

public class DBConnection {
    private static final String url = System.getenv().getOrDefault(
        "SPRING_DATASOURCE_URL",
        "jdbc:postgresql://localhost:5432/rgr"
    );
    private static final String username = System.getenv().getOrDefault(
            "SPRING_DATASOURCE_USERNAME",
            "postgres"
    );
    private static final String password = System.getenv().getOrDefault(
            "SPRING_DATASOURCE_PASSWORD",
            "postgres"
    );

    public static Connection getConnection() throws SQLException {
        Properties prop = new Properties();
        prop.setProperty("user", username);
        prop.setProperty("password", password);

        Connection conn = null;

        try {
            conn = DriverManager.getConnection(url, prop);
        } catch (SQLException e) {
            System.err.println("Проблеми із підключенням до бази " + url);
            e.printStackTrace();
        }

        return conn;
    }
}
