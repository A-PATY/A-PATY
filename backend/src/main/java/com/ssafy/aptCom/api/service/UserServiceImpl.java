package com.ssafy.aptCom.api.service;

import com.ssafy.aptCom.api.dto.request.SignUpRequestDto;
import com.ssafy.aptCom.api.dto.request.UserModifyRequestDto;
import com.ssafy.aptCom.common.jwt.TokenProvider;
import com.ssafy.aptCom.db.entity.*;
import com.ssafy.aptCom.db.repository.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service("userService")
@Slf4j
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private AuthRepository authRepository;

    @Autowired
    private BaseAddressRepository baseAddressRepository;

    @Autowired
    private TokenProvider tokenProvider;

    @Autowired
    private ProfileImgRepository profileImgRepository;

    @Autowired
    private CommunityRepository communityRepository;

    @Autowired
    private UserCommunityRepository userCommunityRepository;

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
        ProfileImg profileImg = profileImgRepository.getOne(1);

        User user = User.builder()
                .kakaoUserNumber(kakaoNumber)
                .roles("ROLE_USER")
                .billStatus("미제출")
                .profileImg(profileImg)
                .build();

        return userRepository.save(user);

    }

    @Transactional
    @Override
    public void userSave(SignUpRequestDto signUpRequestDto, String kakaoUserNumber) {
        User user = getUserByKakaoUserNumber(kakaoUserNumber);
        BaseAddress baseAddress = getAddress(signUpRequestDto.getAddress());
        ProfileImg profileImg = getProfileImg(signUpRequestDto.getProfileImgId());

        user.setNickname(signUpRequestDto.getNickName());
        user.setProfileImg(profileImg);
        user.setBaseAddress(baseAddress);

        userRepository.save(user);

        userCommunitySave(signUpRequestDto.getAddress(), user);

    }

    public void userCommunitySave(String addressCode, User user) {
        Community community = communityRepository.findCommunityByCommunityCode(addressCode);

        UserCommunity userCommunity = UserCommunity.builder()
                .community(community)
                .user(user)
                .build();

        userCommunityRepository.save(userCommunity);

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

        authRepository.deleteById(auth.get().getId());
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
            ProfileImg profileImg = getProfileImg(userModifyRequestDto.getProfileImgId());
            user.setProfileImg(profileImg);
        } else if (profileInfo.equals("find-family")) {
            user.setFindFamily(userModifyRequestDto.isFindFamily());
        }
        return userRepository.save(user);
    }

    @Transactional
    @Override
    public void deleteUser(User user) { userRepository.delete(user); }

    public ProfileImg getProfileImg(int profileImgId) {
        return profileImgRepository.findById(profileImgId);
    }

}
