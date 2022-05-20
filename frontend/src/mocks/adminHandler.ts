import { rest } from 'msw';
import { bills } from './database/adminDatabase';

export const adminHandlers = [
  rest.get(
    `${process.env.REACT_APP_LOCALHOST_URL}/api/v1/admin/bill`,
    async (request, response, context) => {
      return response(
        context.json({
          bills: bills,
        }),
      );
    },
  ),

  rest.post(
    `${process.env.REACT_APP_LOCALHOST_URL}/api/v1/admin/bill`,
    async (request, response, context) => {
      return response(
        context.json({
          message: '고지서 인증 응답을 기다려주세요.',
        }),
      );
    },
  ),

  rest.delete(
    `${process.env.REACT_APP_LOCALHOST_URL}/api/v1/admin/bill`,
    async (request, response, context) => {
      return response(
        context.json({
          message: '고지서 인증 응답을 기다려주세요.',
        }),
      );
    },
  ),
];
