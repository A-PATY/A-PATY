export interface articles {
  articles: article[];
}

export interface article {
  articleId: number;
  category: string;
  title: string;
  contents: string;
  imgs: img[] | null;
  contact: string | null;
  isDone: boolean | null;
  views: number;
  likes: number;
  isLike: boolean;
  createdAt: string;
  commentCount: number;
  author: string;
}

export interface img {
  imgId: number;
  src: string;
}
