import { rest } from 'msw';

export const loginHandlers = [
  rest.post(
    `${process.env.REACT_APP_LOCALHOST_URL}/api/v1/auth/users/log-in`,
    async (request: any, response, context) => {
      const accessCode: string = request.body;
      const userName = request.url.searchParams.get('userName');

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
          success: true,
          message: '인증 코드가 맞습니다.',
        }),
      );
    },
  ),
];
