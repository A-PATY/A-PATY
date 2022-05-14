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
  doneyn: boolean | null;
  views: number;
  likes: number;
  isLike: boolean;
  createdAt: string;
  author: string;
  commentCount: number;
  profileImgUrl: string;
  commentsList: comment[];
}

export interface img {
  imgId: number;
  src: string;
}

export interface comment {
  commentId: number;
  commentWriter: string;
  commentContent: string;
  commentCreatedAt: string;
  secret: boolean;
  commentAuthor: string;
  profileImgUrl: string;
}

export interface category {
  // key: number;
  // label: string;
  categoryId: number;
  categoryName: string;
  adminOnly: boolean;
}
