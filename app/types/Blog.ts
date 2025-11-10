export interface Blog {
  blog_id: number;
  authodr_id?: number;
  title: string;
  summary: string;
  content?: string;
  publish_date: string;
  author: string;
  like_count?: number;
}
