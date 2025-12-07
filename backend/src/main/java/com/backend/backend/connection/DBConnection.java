package com.backend.backend.connection;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Properties;

public class DBConnection {
    private final static String url = "jdbc:postgresql://localhost:5432/railway";
    private final static String username = "postgres";
    private final static String password = "postgres";

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
