import { axiosInstance } from './../utils/axios';
import { articles } from '../types/boardTypes';

class BoardService {
  public static async getArticles(
    communityId: number,
    lastArticleId: number,
    size: number,
    categoryId: number,
    keyword: string | null,
  ) {
    const response = await axiosInstance.get<articles>('/api/v1/board', {
      params: {
        communityId: communityId,
        lastArticleId: lastArticleId,
        size: size,
        category: categoryId,
        keyword: keyword,
      },
    });
    return response.data;
  }
}

export default BoardService;
