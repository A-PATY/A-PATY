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

    @Autowired
    private ArticleRepository articleRepository;

    @Autowired
    private CommentRepository commentRepository;

    @Autowired
    private ImageRepository imageRepository;

    @Autowired
    private LikesRepository likesRepository;

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
                .billStatus("?????????")
                .profileImg(profileImg)
                .build();

        return userRepository.save(user);

    }

    @Transactional
    @Override
    public User userSave(SignUpRequestDto signUpRequestDto, String kakaoUserNumber) {
        User user = getUserByKakaoUserNumber(kakaoUserNumber);
        BaseAddress baseAddress = getAddress(signUpRequestDto.getAddress());
        ProfileImg profileImg = getProfileImg(signUpRequestDto.getProfileImgId());

        user.setNickname(signUpRequestDto.getNickname());
        user.setProfileImg(profileImg);
        user.setBaseAddress(baseAddress);
        user.setUserName(signUpRequestDto.getName());

        return userRepository.save(user);

    }

    @Transactional
    @Override
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
        authRepository.deleteAllByUserId(user.getId());
    }

    @Transactional
    @Modifying
    @Override
    public void userModify(UserModifyRequestDto userModifyRequestDto, User user, String profileInfo) {

        if (profileInfo.equals("nickname")) {
            user.setNickname(userModifyRequestDto.getNickname());
            userRepository.save(user);
        } else if (profileInfo.equals("address")) {
            // ?????? + ????????? ???????????? ??????
            userCommunityRepository.deleteAllByUserId(user.getId());
            BaseAddress baseAddress = getAddress(userModifyRequestDto.getAddress());
            user.setBaseAddress(baseAddress);
            user.setBillStatus("?????????");
            user.setDong(null);
            user.setHo(null);
            user.setApartment(null);
            userRepository.save(user);
            // ?????? ???????????? ??????
            Community community = communityRepository.findCommunityByCommunityCode(userModifyRequestDto.getAddress());
            UserCommunity userCommunity = UserCommunity.builder()
                    .community(community)
                    .user(user)
                    .build();
            userCommunityRepository.save(userCommunity);
        } else if (profileInfo.equals("profileImgId")) {
            ProfileImg profileImg = getProfileImg(userModifyRequestDto.getProfileImgId());
            user.setProfileImg(profileImg);
            userRepository.save(user);
        } else if (profileInfo.equals("findFamily")) {
            user.setFindFamily(userModifyRequestDto.isFindFamily());
            userRepository.save(user);
        }

    }

    @Transactional
    @Override
    public void userDelete(User user) {

        // User ??????
        userRepository.delete(user);

    }

    public ProfileImg getProfileImg(int profileImgId) {
        return profileImgRepository.findById(profileImgId);
    }

}
