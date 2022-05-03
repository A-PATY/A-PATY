package com.ssafy.aptCom.common.jwt;

import com.ssafy.aptCom.db.entity.User;
import com.ssafy.aptCom.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service("customUserDetailService")
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public CustomUserDetails loadUserByUsername(String kakaoNum) throws UsernameNotFoundException {
        User user = userRepository.findByKakaoUserNumber(kakaoNum).orElse(null);
        if(user != null){
            CustomUserDetails userDetails = new CustomUserDetails(user);
            return userDetails;
        }
        return null;
    }
}
