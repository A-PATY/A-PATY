import { rest } from 'msw';

export const familyHandlers = [
  rest.get(
    `${process.env.REACT_APP_LOCALHOST_URL}/api/v1/family-list`,
    async (request: any, response, context) => {

      return response(
        context.json({
          familyId: "1-101-203",
          familyAddress: "서울시 성동구 금호동 삼성래미안아파트",
          familyList: [
              { 
                userId: 5,
                userName: "장미",
                profileImgUrl: "https://images.unsplash.com/photo-1496062031456-07b8f162a322?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cm9zZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60",
                findFamily: false
              },
              {
                userId: 6,
                userName: "민들레",
                profileImgUrl: "https://media.istockphoto.com/photos/dandelion-picture-id1319392296?b=1&k=20&m=1319392296&s=170667a&w=0&h=aBrdrkPuhnroPo2hK0rIvcTXn-_TxYUTnvHer_DCBY0=",
                findFamily: false
              }
          ],
        }),
      );
    },
  ),
];
