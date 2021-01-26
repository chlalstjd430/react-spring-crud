package com.springreact.demo.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;

@RestController
@RequestMapping("v1/test")
public class TestController {

    @GetMapping
    public String test() {
        return "Test date" + LocalDateTime.now();
    }
}
