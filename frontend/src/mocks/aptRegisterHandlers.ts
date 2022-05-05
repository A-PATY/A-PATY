import { rest } from 'msw';
import { aptList } from './database/aptRegisterDatabase';

export const aptRegisterHandlers = [
  rest.get(
    `${process.env.REACT_APP_LOCALHOST_URL}/api/v1/community/apt`,
    async (request, response, context) => {
      return response(
        context.json({
          aptList: aptList,
        }),
      );
    },
  ),
];
