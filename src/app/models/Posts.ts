export interface PostCart {
  items: Array<PostItemCart>;
}

export interface PostItemCart {
  id?: number;
  name: string;
  slug: string;
  quantity: number;
  price: number;
}

export interface Post {
  id?: number;
  name: string;
  title: string;
  body: string;
  slug: string;
  quantity?: number;
}
