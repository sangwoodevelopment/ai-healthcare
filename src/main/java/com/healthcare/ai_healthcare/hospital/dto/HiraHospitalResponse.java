package com.healthcare.ai_healthcare.hospital.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Getter;

@Getter
public class HiraHospitalResponse {

    private Response response;

    @Getter
    public static class Response {
        private Header header;
        private Body body;
    }

    @Getter
    public static class Header {
        private String resultCode;
        private String resultMsg;
    }

    @Getter
    public static class Body {
        private Items items;
        private int numOfRows;
        private int pageNo;
        private int totalCount;
    }

    @Getter
    public static class Items {
        private java.util.List<Item> item;
    }

    @Getter
    public static class Item {

        @JsonProperty("yadmNm")
        private String name;

        @JsonProperty("addr")
        private String address;

        @JsonProperty("telno")
        private String phoneNumber;

        @JsonProperty("sidoCdNm")
        private String sido;

        @JsonProperty("sgguCdNm")
        private String sigungu;

        @JsonProperty("clCdNm")
        private String department;

        @JsonProperty("ykiho")
        private String ykiho;
    }
}