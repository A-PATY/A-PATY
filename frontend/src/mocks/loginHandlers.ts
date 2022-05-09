import { rest } from 'msw';
import { ProfileImageList, userInfo } from './database/UserInfoDatabase';

export const loginHandlers = [
  rest.post(
    `${process.env.REACT_APP_LOCALHOST_URL}/api/v1/auth/users/log-in`,
    async (request: any, response, context) => {
      const accessCode: string = request.body;

      if (accessCode === '11111') {
        return response(
          context.status(400),
          context.json({
            status: 400,
            success: false,
            message: '잘못된 인증 코드 입니다.',
          }),
        );
      }

      if (accessCode === '55555') {
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
        context.json({
          accessToken: 'sdlfkjslkdjflksjflks',
          refreshToken: 'dkjslkfjdlkjflskdjf',
          newMember: false,
        }),
      );
    },
  ),

  rest.post(
    `${process.env.REACT_APP_LOCALHOST_URL}/api/v1/auth/users/issue-token`,
    async (request, response, context) => {
      // const token: string | null =
      //   request.headers['_headers'].authorization.split(' ')[1];

      // if (accessCode === '11111') {
      //   return response(
      //     context.status(400),
      //     context.json({
      //       status: 400,
      //       success: false,
      //       message: '잘못된 인증 코드 입니다.',
      //     }),
      //   );
      // }

      // if (accessCode === '55555') {
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
        context.json({
          accessToken: 'sdlfkjslkdjflksjflks',
          refreshToken: 'dkjslkfjdlkjflskdjf',
        }),
      );
    },
  ),

  rest.get(
    `${process.env.REACT_APP_LOCALHOST_URL}/api/v1/profile-img`,
    async (request, response, context) => {
      return response(
        context.json({
          profileImgList: ProfileImageList,
        }),
      );
    },
  ),

  rest.post(
    `${process.env.REACT_APP_LOCALHOST_URL}/api/v1/auth/users/sign-up`,
    async (request, response, context) => {
      context.status(401);

      return response(
        context.status(401),
        context.json({
          status: 400,
          success: false,
          message: '입력값이 유효하지 않습니다.',
        }),
      );

      // return response(
      //   context.status(400),
      //   context.json({
      //     status: 400,
      //     success: false,
      //     message: '잘못된 인증 코드 입니다.',
      //   }),
      // );

      // return response(
      //   context.json({
      //     message: '회원가입이 완료되었습니다.',
      //   }),
      // );
    },
  ),

  rest.get(
    `${process.env.REACT_APP_LOCALHOST_URL}/api/v1/auth/users/user-info`,
    async (request, response, context) => {
      return response(
        context.json({
          userInfo: userInfo,
        }),
      );
    },
  ),
];
