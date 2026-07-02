package com.healthcare.ai_healthcare.hospital.client;

import com.healthcare.ai_healthcare.hospital.dto.HiraHospitalResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.net.URI;

@Component
public class HiraHospitalClient {

    @Value("${hira.api.service-key}")
    private String serviceKey;

    private final RestTemplate restTemplate = new RestTemplate();

    public HiraHospitalResponse getHospitalList(int pageNo, int numOfRows) {
        String url = "https://apis.data.go.kr/B551182/hospInfoServicev2/getHospBasisList"
                + "?serviceKey=" + serviceKey
                + "&pageNo=" + pageNo
                + "&numOfRows=" + numOfRows
                + "&_type=json";

        return restTemplate.getForObject(
                URI.create(url),
                HiraHospitalResponse.class
        );
    }
}