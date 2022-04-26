export interface articles {
  articles: article[];
}

export interface article {
  articleId: number;
  category: string;
  title: string;
  contents: string;
  img: any | null;
  contact: string | null;
  isDone: boolean;
  views: number;
  likes: number;
  isLike: boolean;
  createdAt: string;
  commentCount: number;
  author: string;
}
