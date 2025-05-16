package com.example.movie.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Bean
    SecurityFilterChain filterChain (HttpSecurity httpSecurity) throws Exception{
        httpSecurity
                .authorizeHttpRequests( auth -> auth
                        .requestMatchers("api/admin/**").hasRole("ADMIN")
                        .requestMatchers("api/user/**").hasRole("USER")
                        .anyRequest().permitAll()
                )
                .csrf(csrf -> csrf.disable())
                .httpBasic(Customizer.withDefaults());

        return httpSecurity.build();

    }

    @Bean
    PasswordEncoder passwordEncoder(){
        return new BCryptPasswordEncoder();
    }
    @Bean
    UserDetailsService  userDetailsService (PasswordEncoder passwordEncoder){
        UserDetails user = User.builder()
                .username("moghz")
                .password(passwordEncoder.encode("moghz123"))
                .roles("ADMIN")
                .build();

        UserDetails user2 = User.builder()
                .username("m8z")
                .password(passwordEncoder.encode("m8z123"))
                .roles("USER")
                .build();

        return new InMemoryUserDetailsManager(user, user2);
    }
}