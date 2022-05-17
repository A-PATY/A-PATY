export interface articles {
  articles: article[];
}

export interface article {
  articleId: number;
  author: string;
  authorId: number;
  category: string;
  commentCount: number;
  commentsList: comment[];
  contact: string | null;
  contents: string;
  createdAt: string;
  doneyn: boolean | null;
  imgs: img[] | null;
  likes: number;
  likeyn: boolean;
  profileImgUrl: string;
  title: string;
  views: number;
}

export interface img {
  id: number;
  imgUrl: string;
}

export interface comment {
  commentId: number;
  commentWriter: string;
  commentContent: string;
  commentCreatedAt: string;
  secret: boolean;
  commentAuthor: string;
  commentAuthorId: number;
  profileImgUrl: string;
}

export interface category {
  // key: number;
  // label: string;
  categoryId: number;
  categoryName: string;
  adminOnly: boolean;
}
