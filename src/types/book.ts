export default interface IBook {
  bookId: number;
  title: string;
  genre: string;
  author: string;
  read: boolean;
  details?: {
    image_url: string;
    description: string;
  };
}
