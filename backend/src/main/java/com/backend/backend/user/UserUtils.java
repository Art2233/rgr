package com.backend.backend.user;

import java.nio.charset.StandardCharsets;
import java.util.Base64;

public class UserUtils {
    public String encodePassword(String rawPassword) {
        return Base64.getEncoder().encodeToString(
                rawPassword.getBytes(StandardCharsets.UTF_8)
        );
    }
}
