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
    contents: '가까이에서 까치를 관찰했어요',
    imgs: null,
    contact: null,
    isDone: false,
    views: 13,
    likes: 15,
    isLike: true,
    createdAt: '2022-04-15 15:03',
    commentCount: 3,
    author: '101동 102호 흑장미',
  },
  {
    articleId: 2,
    category: '일상',
    title: '점심 다들 뭐 먹었나요',
    contents: '오늘 점심 돈까스였습니다. 너무 더워요',
    imgs: null,
    contact: null,
    isDone: false,
    views: 13,
    likes: 15,
    isLike: true,
    createdAt: '2022-04-15 15:03',
    commentCount: 3,
    author: '101동 102호 흑장미',
  },
  {
    articleId: 3,
    category: '나눔장터',
    title: '달려오세요',
    contents: '인형 나눔해요',
    imgs: [{ imgId: 1, src: `\img\did.png` }],
    contact: '010-1111-2222',
    isDone: false,
    views: 13,
    likes: 15,
    isLike: false,
    createdAt: '2022-04-15 15:03',
    commentCount: 3,
    author: '101동 102호 백장미',
  },
  {
    articleId: 4,
    category: '나눔장터',
    title: '달려오세요',
    contents: '인형 나눔해요',
    imgs: [{ imgId: 2, src: `\img\did.png` }],
    contact: '010-1111-2222',
    isDone: false,
    views: 13,
    likes: 15,
    isLike: false,
    createdAt: '2022-04-15 15:03',
    commentCount: 3,
    author: '101동 102호 백장미',
  },
  {
    articleId: 5,
    category: '공구',
    title: '가지고 싶어요 ㅠㅠㅠ',
    contents: '인형 공구해요',
    imgs: [{ imgId: 3, src: `\img\did.png` }],
    contact: '010-1111-2222',
    isDone: false,
    views: 13,
    likes: 15,
    isLike: false,
    createdAt: '2022-04-15 15:03',
    commentCount: 3,
    author: '101동 102호 백장미',
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
  },
  {
    articleId: 8,
    category: '공구',
    title: '먹고 싶어요 ㅠㅠㅠ',
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
  },
];

export const boardHandlers = [
  rest.get(
    `${process.env.REACT_APP_LOCALHOST_URL}/api/v1/board`,
    async (request: any, response, context) => {
      console.log(request);
      // const { communityId, lastArticleId, size, params } = request.body;

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
          articles: articles,
        }),
      );
    },
  ),
];
