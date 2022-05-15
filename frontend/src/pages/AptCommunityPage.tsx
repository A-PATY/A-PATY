import styled from '@emotion/styled';
import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import Footer from '../components/common/Footer';
import BoardList from '../components/Community/Local/BoardList';
import BoardHeader from '../components/Community/Local/BoardHeader';
import { userInfoState } from '../features/Login/atom';
import BoardService from '../services/BoardService';
import { useInfiniteQuery } from 'react-query';
import useCommunityId from '../hooks/useCommunityId';
import Box from '@mui/material/Box';
import AptAnonyCommunity from '../components/Community/Apt/AptAnonyCommunity';
import AptTabHeader from '../components/Community/Apt/AptTabHeader';

const AptCommunityPage: React.FC = () => {
  // const userInfo = useRecoilValue(userInfoState);
  // console.log('userInfo : ');
  // console.log(userInfo);

  // 공통 함수
  const AptCommunityId = useCommunityId(2);
  console.log(AptCommunityId);

  // const [lastArticleId, setLastArticleId] = React.useState<number>(0);
  const defaultPaginationSize = 10; // 한 번 요청으로 가져올 게시글의 개수
  const [categoryId, setCategoryId] = useState<number>(0);
  const [keyword, setKeyword] = useState<string>('');

  const fetchArticles = async ({ pageParam = 0 }) => {
    const { articles } = await BoardService.getArticles(
      AptCommunityId,
      pageParam,
      defaultPaginationSize,
      categoryId,
      keyword,
    );
    return {
      result: articles,
    };
  };

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteQuery(
    [`localArticles-category${categoryId}`, AptCommunityId, keyword],
    fetchArticles,
    {
      getNextPageParam: (lastPage) => {
        // console.log('lastPage : ');
        // console.log(lastPage);
        return lastPage.result.length !== 0
          ? lastPage.result[lastPage.result.length - 1].articleId
          : false;
      },
      // getNextPageParam: (lastPage) =>
      //   lastPage.result[lastPage.result.length - 1].articleId, // 마지막 글 id (lastArticleId)를 다음 param으로 보냄
    },
  );

  interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
  }

  function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box>
            {children}
            {/* <Typography>{children}</Typography> */}
          </Box>
        )}
      </div>
    );
  }

  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  useEffect(() => {
    document.title = '아파트 커뮤니티';
  }, []);

  return (
    <>
      <Container>
        <Box sx={{ width: '100%' }}>
          <AptTabHeader value={value} handleChange={handleChange} />
          <TabPanel value={value} index={0}>
            <BoardHeader
              type={2}
              communityId={AptCommunityId}
              keyword={keyword}
              setKeyword={setKeyword}
            />
            <BoardList
              categoryId={categoryId}
              setCategoryId={setCategoryId}
              data={data}
              fetchNextPage={fetchNextPage}
              hasNextPage={hasNextPage}
              isFetching={isFetching}
              isFetchingNextPage={isFetchingNextPage}
            />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <AptAnonyCommunity />
          </TabPanel>
        </Box>
      </Container>
      <Footer footerNumber={2} />
    </>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100% - 70px);
`;
export default AptCommunityPage;
