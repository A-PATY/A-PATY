package com.ssafy.aptCom.api.service;

import com.ssafy.aptCom.api.dto.request.SignUpRequestDto;
import com.ssafy.aptCom.api.dto.request.UserModifyRequestDto;
import com.ssafy.aptCom.common.jwt.TokenProvider;
import com.ssafy.aptCom.db.entity.Auth;
import com.ssafy.aptCom.db.entity.BaseAddress;
import com.ssafy.aptCom.db.entity.User;
import com.ssafy.aptCom.db.repository.AuthRepository;
import com.ssafy.aptCom.db.repository.BaseAddressRepository;
import com.ssafy.aptCom.db.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.jpa.repository.Modifying;
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

    public BaseAddress getAddress(String address) {
        return baseAddressRepository.findByAddress(address);
    }

    @Transactional
    @Override
    public void deleteAuth(User user) {
        Optional<Auth> auth = authRepository.findByUserId(user.getId());

        authRepository.delete(auth);
    }

    @Transactional
    @Modifying
    @Override
    public User userModify(UserModifyRequestDto userModifyRequestDto, User user, String profileInfo) {

        if (profileInfo.equals("nickname")) {
            user.setNickname(userModifyRequestDto.getNickName());
        } else if (profileInfo.equals("address")) {
            BaseAddress baseAddress = getAddress(userModifyRequestDto.getAddress());
            user.setBaseAddress(baseAddress);
        } else if (profileInfo.equals("profile-img")) {
            user.setProfileImg(userModifyRequestDto.getProfileImgId());
        } else if (profileInfo.equals("find-family")) {
            user.setFindFamily(userModifyRequestDto.isFindFamily());
        }
        return userRepository.save(user);
    }

    @Transactional
    @Override
    public void deleteUser(User user) { userRepository.delete(user); }

}
