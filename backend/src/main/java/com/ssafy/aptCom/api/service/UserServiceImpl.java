package com.ssafy.aptCom.api.service;

import com.ssafy.aptCom.api.dto.request.SignUpRequestDto;
import com.ssafy.aptCom.common.jwt.TokenProvider;
import com.ssafy.aptCom.db.entity.Auth;
import com.ssafy.aptCom.db.entity.BaseAddress;
import com.ssafy.aptCom.db.entity.User;
import com.ssafy.aptCom.db.repository.AuthRepository;
import com.ssafy.aptCom.db.repository.BaseAddressRepository;
import com.ssafy.aptCom.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service("userService")
@Slf4j
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    private final AuthRepository authRepository;

    private final BaseAddressRepository baseAddressRepository;

    private final TokenProvider tokenProvider;

    @Override
    public User getUserByKakaoUserNumber(String kakaoUserNumber) {
        return userRepository.findByKakaoUserNumber(kakaoUserNumber).orElse(null);
    }

    @Transactional
    @Override
    public String[] createTokens(User user) {
        String accessToken = tokenProvider.createJwtAccessToken(user.getKakaoUserNumber(), user.getRoleList());
        String refreshToken = tokenProvider.createJwtRefreshToken(user.getKakaoUserNumber());

        Auth auth = Auth.builder()
                .user(user)
                .refreshToken(refreshToken)
                .build();

        authRepository.save(auth);

        return new String[]{accessToken, refreshToken};

    }

    @Transactional
    @Override
    public User userNew(String kakaoNumber) {
        User user = User.builder()
                .kakaoUserNumber(kakaoNumber)
                .roles("ROLE_USER")
                .build();

        return userRepository.save(user);

    }

    @Transactional
    @Override
    public User userSave(SignUpRequestDto signUpRequestDto, String kakaoUserNumber) {
        User user = getUserByKakaoUserNumber(kakaoUserNumber);
        BaseAddress baseAddress = getAddress(signUpRequestDto.getAddress());

        user.setNickname(signUpRequestDto.getNickName());
        user.setProfileImg(signUpRequestDto.getProfileImgId());
        user.setBaseAddress(baseAddress);

        return userRepository.save(user);

    }

    @Override
    public Optional<Auth> getAuthByRefreshToken(String refreshToken) {
        return authRepository.findByRefreshToken(refreshToken);
    }

    @Override
    public void logOut(Auth auth) {

    }

    public BaseAddress getAddress(String address) {
        return baseAddressRepository.findByAddress(address);
    }



}
