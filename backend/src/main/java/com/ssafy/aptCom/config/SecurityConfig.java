package com.ssafy.aptCom.config;

import com.ssafy.aptCom.common.jwt.AuthenticationFilter;
import com.ssafy.aptCom.common.jwt.JwtAccessDeniedHandler;
import com.ssafy.aptCom.common.jwt.JwtAuthenticationEntryPoint;
import com.ssafy.aptCom.common.jwt.TokenProvider;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.access.AccessDeniedException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.access.AccessDeniedHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Arrays;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final TokenProvider tokenProvider;

//    private final JwtAccessDeniedHandler jwtAccessDeniedHandler;
//
//    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;

//    public SecurityConfig(TokenProvider tokenProvider, JwtAccessDeniedHandler jwtAccessDeniedHandler, JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint) {
    public SecurityConfig(TokenProvider tokenProvider) {
        this.tokenProvider = tokenProvider;
//        this.jwtAccessDeniedHandler = jwtAccessDeniedHandler;
//        this.jwtAuthenticationEntryPoint = jwtAuthenticationEntryPoint;

    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http
                    .httpBasic().disable()
                    .cors().configurationSource(corsConfigurationSource())
                .and()
                    .csrf().disable()
                    .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                    .formLogin().disable()
                    .authorizeRequests()
                    .antMatchers("/api/v1/admin/*").hasRole("ADMIN")
                    .antMatchers("/api/v1/users/*").hasAnyRole("USER","ADMIN")
                    .antMatchers("/api/v1/board/*").hasAnyRole("USER","ADMIN")
                    .antMatchers("/api/v1/community/*").hasAnyRole("USER","ADMIN")
                    .antMatchers("/api/v1/family-list/*").hasAnyRole("USER","ADMIN")
                    .antMatchers("/api/v1/users/*").hasAnyRole("USER","ADMIN")
                    .antMatchers("/api/v1/board/*").hasAnyRole("USER","ADMIN")
                    .antMatchers("/api/v1/community/*").hasAnyRole("USER","ADMIN")
                    .antMatchers("/api/v1/family-list/*").hasAnyRole("USER","ADMIN")
                    .antMatchers("/api/v1/auth/users/sign-up").hasAnyRole("USER","ADMIN")
                    .antMatchers("/api/v1/auth/users/user-info").hasAnyRole("USER","ADMIN")
                    .antMatchers("/api/v1/auth/users/log-out").hasAnyRole("USER","ADMIN")
                    .antMatchers("/api/v1/auth/users/category-list").hasAnyRole("USER","ADMIN")
                    .anyRequest().permitAll()
                .and()
                    .exceptionHandling()
                    .authenticationEntryPoint((request, response, authException) -> response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "로그인 후 이용 가능합니다."))
                    .accessDeniedHandler((request, response, accessDeniedException) -> response.sendError(HttpServletResponse.SC_FORBIDDEN, "접근 권한이 없습니다."))
//                .and()
//                    .logout()
//                    .logoutSuccessUrl("/")
//                    .invalidateHttpSession(true)
                .and()
                    .addFilterBefore(new AuthenticationFilter(tokenProvider), UsernamePasswordAuthenticationFilter.class);
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {

        CorsConfiguration configuration = new CorsConfiguration();

        configuration.setAllowedOrigins(Arrays.asList("http://localhost:3000", "https://apaty.co.kr", "https://www.apaty.co.kr"));
//        configuration.addAllowedOrigin("*");
        configuration.addAllowedHeader("*");
        configuration.addAllowedMethod("*");
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/api/**", configuration);

        return source;
    }

    // h2 관련된 건 차단 무시
    @Override
    public void configure(WebSecurity web) throws Exception {

        web.ignoring().antMatchers("/h2-console/**", "/favicon.ico");

    }

    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {

        return super.authenticationManagerBean();

    }

}
