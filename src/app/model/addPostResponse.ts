export interface imageData {
  name?: string;
  size?: number;
  type?: string;
  url: string;
}

export interface Post {
  categoryType: string;
  city: string;
  condition: string;
  contactName: string;
  dateTime: string;
  email: string;
  imageList: imageData[]; // Array of image objects
  itemDescription: string;
  itemName: string;
  mobileNo: string;
  price: string;
  userId: string;
}

export interface FirebasePostResponse {
  [key: string]: Post; // Firebase generates a unique key for each post
}
