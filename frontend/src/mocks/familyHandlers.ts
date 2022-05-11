import { TramRounded } from '@mui/icons-material';
import { truncate } from 'fs';
import { rest } from 'msw';

export const familyHandlers = [
  rest.get(
    `${process.env.REACT_APP_LOCALHOST_URL}/api/v1/family-list`,
    async (request: any, response, context) => {
      return response(
        context.json({
          familyId: "1-101-203",
          familyList: [
              { 
                userId: 5,
                userName: "가족1",
                profileImgUrl: '../img/horse.png',
                findFamily: true
              },
              {
                userId: 6,
                userName: "가족2",
                profileImgUrl: '../img/cat.png',
                findFamily: false
              },
              {
                userId: 12,
                userName: "유저(나)",
                profileImgUrl: '../img/sheep.png',
                findFamily: true
              },
          ],
        }),
      );
    },
  ),
];
