package com.healthcare.ai_healthcare.common.response;

import lombok.Getter;

@Getter
public class ErrorResponse {

    private final boolean success;
    private final String code;
    private final String message;

    private ErrorResponse(boolean success, String code, String message) {
        this.success = success;
        this.code = code;
        this.message = message;
    }

    public static ErrorResponse of(String code, String message) {
        return new ErrorResponse(false, code, message);
    }
}