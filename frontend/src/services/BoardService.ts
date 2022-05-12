import { axiosInstance } from './../utils/axios';
import { articles, article } from '../types/boardTypes';
import React from 'react';

class BoardService {
  public static async getArticles(
    communityId: number | undefined,
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

  public static async editArticle(
    articleId: string | undefined,
    formData: FormData,
  ) {
    const response = await axiosInstance.put(
      `/api/v1/board/${articleId}`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );
    return response.data;
  }

  public static async deleteArticle(articleId: string | undefined) {
    const response = await axiosInstance.delete(`/api/v1/board/${articleId}`);
    return response.data;
  }

  public static async createComment(
    articleId: string | undefined,
    comment: { contents: string; secret: boolean },
  ) {
    const response = await axiosInstance.post(
      `/api/v1/board/${articleId}/comments`,
      comment,
    );
    return response.data;
  }

  public static async deleteComment(
    articleId: string | undefined,
    commentId: string | undefined,
  ) {
    const response = await axiosInstance.delete(
      `/api/v1/board/${articleId}/comments/${commentId}`,
    );
    return response.data;
  }
}

export default BoardService;
