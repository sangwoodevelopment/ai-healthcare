package com.healthcare.ai_healthcare.hospital.client;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;

@Component
@RequiredArgsConstructor
public class HiraHospitalClient {

    @Value("${hira.api.service-key}")
    private String serviceKey;

    private final RestTemplate restTemplate = new RestTemplate();

    public String getHospitalList(int pageNo, int numOfRows) {
        String url = "https://apis.data.go.kr/B551182/hospInfoServicev2/getHospBasisList"
                + "?serviceKey=" + serviceKey
                + "&pageNo=" + pageNo
                + "&numOfRows=" + numOfRows
                + "&_type=json";

        System.out.println("HIRA 요청 URL = " + url);

        return restTemplate.getForObject(URI.create(url), String.class);
    }
}