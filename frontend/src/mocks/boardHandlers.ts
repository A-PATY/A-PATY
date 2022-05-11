import { rest } from 'msw';
import { article } from '../types/boardTypes';

const categoryList: {
  categoryId: number;
  categoryName: string;
  adminOnly: boolean;
}[] = [
  {
    categoryId: 1,
    categoryName: '전체',
    adminOnly: false,
  },
  {
    categoryId: 2,
    categoryName: '일상',
    adminOnly: false,
  },
  {
    categoryId: 3,
    categoryName: '정보',
    adminOnly: false,
  },
  {
    categoryId: 4,
    categoryName: '나눔장터',
    adminOnly: false,
  },
  {
    categoryId: 5,
    categoryName: '헬프',
    adminOnly: false,
  },
  {
    categoryId: 6,
    categoryName: '육아',
    adminOnly: false,
  },
  {
    categoryId: 7,
    categoryName: '공구',
    adminOnly: false,
  },
  {
    categoryId: 8,
    categoryName: '후기',
    adminOnly: false,
  },
];

const articles: article[] = [
  {
    articleId: 1,
    category: '일상',
    title: '오늘 베란다에 까치가 왔어요',
    contents:
      '이렇게 가까이에서 까치를 관찰한건 처음이에요! 털이 나름 복슬복슬',
    imgs: [
      {
        imgId: 1,
        src: 'https://i.pinimg.com/550x/0a/55/ce/0a55cee83ccb25a90b7deda9a995bbe8.jpg',
      },
    ],
    contact: null,
    isDone: false,
    views: 13,
    likes: 15,
    isLike: true,
    createdAt: '2022-04-15 15:03',
    commentCount: 3,
    author: '101동 102호 흑장미',
    profileImgUrl: 'https://...askalfi21k333kejf',
    commentsList: [
      {
        commentId: 1,
        commentWriter: '흑장미',
        commentContent: '우리 동네엔 새가 많아서 좋아요',
        commentCreatedAt: '2022-04-15 15:03',
        secret: false,
        commentAuthor: '101동 102호 흑장미',
        profileImgUrl: 'https://...askalfi21k333kejf',
      },
      {
        commentId: 1,
        commentWriter: '까치',
        commentContent: '우앙 신기해요',
        commentCreatedAt: '2022-04-15 15:03',
        secret: false,
        commentAuthor: '104동 501호 까치',
        profileImgUrl: 'https://...askalfi21k333kejf',
      },
    ],
  },
  {
    articleId: 2,
    category: '일상',
    title: '점심 다들 뭐 먹었나요',
    contents: '오늘 점심 돈까스였습니다. 너무 더워요',
    imgs: null,
    contact: '010-1111-2222',
    isDone: false,
    views: 13,
    likes: 15,
    isLike: true,
    createdAt: '2022-04-15 15:03',
    author: '101동 102호 흑장미',
    commentCount: 3,
    profileImgUrl: 'https://...askalfi21k333kejf',
    commentsList: [
      {
        commentId: 1,
        commentWriter: '흑장미',
        commentContent: '장미가 이쁘네요',
        commentCreatedAt: '2022-04-15 15:03',
        secret: false,
        commentAuthor: '101동 102호 흑장미',
        profileImgUrl: 'https://...askalfi21k333kejf',
      },
      {
        commentId: 2,
        commentWriter: '백장미',
        commentContent: '장미가 안이쁘네요',
        commentCreatedAt: '2022-04-15 16:03',
        secret: true,
        commentAuthor: '101동 102호 백장미',
        profileImgUrl: 'https://...askalfi21k333kejf',
      },
    ],
  },
  {
    articleId: 3,
    category: '나눔장터',
    title: '달려오세요',
    contents: '인형 나눔해요',
    imgs: [{ imgId: 1, src: `\img\sheep.png` }],
    contact: '010-1111-2222',
    isDone: false,
    views: 13,
    likes: 15,
    isLike: false,
    createdAt: '2022-04-15 15:03',
    commentCount: 3,
    author: '101동 102호 백장미',
    profileImgUrl: 'https://...askalfi21k333kejf',
    commentsList: [],
  },
  {
    articleId: 4,
    category: '나눔장터',
    title: '달려오세요',
    contents: '인형 나눔해요',
    imgs: [{ imgId: 2, src: `\img\sheep.png` }],
    contact: '010-1111-2222',
    isDone: false,
    views: 13,
    likes: 15,
    isLike: false,
    createdAt: '2022-04-15 15:03',
    commentCount: 3,
    author: '101동 102호 백장미',
    profileImgUrl: 'https://...askalfi21k333kejf',
    commentsList: [],
  },
  {
    articleId: 5,
    category: '공구',
    title: '가지고 싶어요 ㅠㅠㅠ',
    contents: '인형 공구해요',
    imgs: [{ imgId: 3, src: `\img\sheep.png` }],
    contact: '010-1111-2222',
    isDone: false,
    views: 13,
    likes: 15,
    isLike: false,
    createdAt: '2022-04-15 15:03',
    commentCount: 3,
    author: '101동 102호 백장미',
    profileImgUrl: 'https://...askalfi21k333kejf',
    commentsList: [],
  },
  {
    articleId: 6,
    category: '나눔장터',
    title: '가지고 싶어요 ㅠㅠㅠ',
    contents: '인형 나눔해요',
    imgs: null,
    contact: '010-1111-2222',
    isDone: false,
    views: 13,
    likes: 15,
    isLike: false,
    createdAt: '2022-04-15 15:03',
    commentCount: 3,
    author: '101동 102호 백장미',
    profileImgUrl: 'https://...askalfi21k333kejf',
    commentsList: [],
  },
  {
    articleId: 7,
    category: '나눔장터',
    title: '가지고 싶어요 ㅠㅠㅠ',
    contents: '인형 나눔해요',
    imgs: null,
    contact: '010-1111-2222',
    isDone: false,
    views: 13,
    likes: 15,
    isLike: false,
    createdAt: '2022-04-15 15:03',
    commentCount: 3,
    author: '101동 102호 백장미',
    profileImgUrl: 'https://...askalfi21k333kejf',
    commentsList: [],
  },
  {
    articleId: 8,
    category: '공구',
    title: 'Last Article',
    contents: '돈까스 공구해요',
    imgs: null,
    contact: '010-1111-2222',
    isDone: true,
    views: 13,
    likes: 15,
    isLike: false,
    createdAt: '2022-04-15 15:03',
    commentCount: 3,
    author: '101동 102호 백장미',
    profileImgUrl: 'https://...askalfi21k333kejf',
    commentsList: [],
  },
];

export const boardHandlers = [
  rest.get(
    `${process.env.REACT_APP_LOCALHOST_URL}/api/v1/board`,
    async (request: any, response, context) => {
      // console.log('/////////request: ' + request);
      // console.log('/////////response: ' + response);
      // console.log('/////////context: ' + context);

      const communityId = request.url.searchParams.get('communityId');
      // console.log('/////////communityId: ' + communityId);

      // const { communityId, lastArticleId, size, params } = request.body;

      if (communityId === null) {
        return response(
          context.status(400),
          context.json({
            status: 400,
            success: false,
            message: '커뮤니티 아이디가 없습니다.',
          }),
        );
      }

      if (communityId === '55555') {
        return response(
          context.status(500),
          context.json({
            status: 500,
            success: false,
            message: '서버 에러',
          }),
        );
      }

      return response(
        context.status(200),
        context.json({
          status: 200,
          success: true,
          message: '정상적으로 처리되었습니다.',
          articles: articles,
        }),
      );
    },
  ),
  rest.get(
    `${process.env.REACT_APP_LOCALHOST_URL}/api/v1/board/:articleId`,
    async (request: any, response, context) => {
      // const articleId = request.url.searchParams.get('articleId');
      const { articleId } = request.params;
      console.log('/////////articleId: ');
      console.log(articleId);
      const article = articles.find((v) => v.articleId === parseInt(articleId));

      // if (communityId === null) {
      //   return response(
      //     context.status(400),
      //     context.json({
      //       status: 400,
      //       success: false,
      //       message: '커뮤니티 아이디가 없습니다.',
      //     }),
      //   );
      // }

      // if (communityId === '55555') {
      //   return response(
      //     context.status(500),
      //     context.json({
      //       status: 500,
      //       success: false,
      //       message: '서버 에러',
      //     }),
      //   );
      // }

      return response(
        context.status(200),
        context.json({
          status: 200,
          success: true,
          message: '정상적으로 처리되었습니다.',
          data: article,
        }),
      );
    },
  ),
];
