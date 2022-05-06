import { axiosInstance } from './../utils/axios';
import { articles, article } from '../types/boardTypes';
import React from 'react';

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

  public static async getArticle(articleId: string | undefined) {
    const response = await axiosInstance.get(`/api/v1/board/${articleId}`);
    return response.data;
  }

  public static async createNewArticle(formData: FormData) {
    const response = await axiosInstance.post('/api/v1/board', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  }
}

export default BoardService;
