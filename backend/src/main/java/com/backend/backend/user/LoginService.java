package com.backend.backend.user;

import com.backend.backend.connection.DBConnection;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

@Service
public class LoginService {
    UserUtils  userUtils = new UserUtils();

    public User login(
        String userName,
        String password
    ) throws SQLException {
        PreparedStatement ps = null;
        Connection conn = null;
        ResultSet rs = null;

        try {
            conn = DBConnection.getConnection();

            if (conn == null) throw new IllegalStateException("НЕ підключено до БД");

            String encodedPassword = userUtils.encodePassword(password);

            ps = conn.prepareStatement(
                "SELECT id, username, password, role FROM users WHERE username = ? AND password = ?"
            );

            ps.setString(1, userName);
            ps.setString(2, encodedPassword);

            rs = ps.executeQuery();

            if (!rs.next()) {
                return null;
            }

            User user = new User();
            user.setId(rs.getInt("id"));
            user.setUserName(rs.getString("username"));
            user.setPassword(rs.getString("password")); // можно НЕ возвращать
            user.setRole(rs.getString("role"));

            return user;
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public User register(
        String userName,
        String password
    ) throws SQLException {
        PreparedStatement ps = null;
        Connection conn = null;
        ResultSet rs = null;

        try {
            conn = DBConnection.getConnection();

            if (conn == null) throw new IllegalStateException("НЕ підключено до БД");
            String encodedPassword = userUtils.encodePassword(password);

            ps = conn.prepareStatement(
                "INSERT INTO users (username, password, role) "
                    + "VALUES (?, ?, 'USER') "
                    + "RETURNING id, username, role"
            );

            ps.setString(1, userName);
            ps.setString(2, encodedPassword);

            rs = ps.executeQuery();
            rs.next();

            User user = new User();
            user.setId(rs.getInt("id"));
            user.setUserName(rs.getString("username"));
            user.setRole(rs.getString("role"));

            return user;
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public List<User> getUsers() {
        Statement stmt = null;
        Connection conn = null;
        ResultSet rs = null;

        List<User> userList = new ArrayList<>();

        try {
            conn = DBConnection.getConnection();

            if (conn == null) throw new IllegalStateException("НЕ підключено до БД");

            stmt = conn.createStatement();
            boolean hasResultSet = stmt.execute("SELECT id, username, role FROM users");

            if (hasResultSet) {
                rs = stmt.getResultSet();
                while (rs.next()) {
                    User user = new User();
                    user.setId(rs.getInt("id"));
                    user.setUserName(rs.getString("username"));
                    user.setRole(rs.getString("role"));
                    user.setPassword("");
                    userList.add(user);
                }
            }
        }  catch (SQLException e) {
            throw new RuntimeException(e);
        }

        return userList;
    }

    public Object setAdminUser(Integer id) {
        PreparedStatement ps = null;
        Connection conn = null;
        ResultSet rs = null;

        try {
            conn = DBConnection.getConnection();

            if (conn == null) throw new IllegalStateException("НЕ підключено до БД");

            ps = conn.prepareStatement(
                    "UPDATE users SET role = 'ADMIN' WHERE id = ?"
            );

            ps.setInt(1, id);

            int updatedRows = ps.executeUpdate();

            if (updatedRows == 0) {
                throw new RuntimeException("Користувача з таким id не знайдено");
            };

        } catch (SQLException e) {
            throw new RuntimeException(e);
        }

        return null;
    }
}
