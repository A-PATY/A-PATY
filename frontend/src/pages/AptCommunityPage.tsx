import styled from '@emotion/styled';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import Footer from '../components/common/Footer';
import BoardList from '../components/Community/Local/BoardList';
import BoardHeader from '../components/Community/Local/BoardHeader';
import { userInfoState } from '../features/Login/atom';

const AptCommunityPage: React.FC = () => {
  const userInfo = useRecoilValue(userInfoState);
  console.log(userInfo);

  // communityList를 userInfo에서 가져오는걸로 수정해야함
  const communityList = [
    {
      communityId: 455,
      communityType: '지역',
      communityType2: '전체',
    },
    {
      communityId: 478,
      communityType: '아파트',
      communityType2: '전체',
    },
    {
      communityId: 479,
      communityType: '아파트',
      communityType2: '익명',
    },
  ];

  const AptCommunityId = communityList.filter(
    (com) => com.communityType === '아파트' && com.communityType2 === '전체',
  )[0].communityId;
  console.log(AptCommunityId);

  useEffect(() => {
    document.title = '아파트 커뮤니티';
  }, []);

  return (
    <>
      <Container>
        <BoardHeader communityId={AptCommunityId} />
        {/* <BoardList communityId={AptCommunityId} /> */}
      </Container>
      <Footer footerNumber={1} />
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100% - 70px);
`;
export default AptCommunityPage;
