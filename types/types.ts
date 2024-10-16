export type CreateUserProps = {
  clerkId: string;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  image_url: string;
};

export type UpdateUserProps = {
  first_name: string;
  last_name: string;
  username: string;
  image_url: string;
};

export type OrderItem = {
  id: string;
  buyer: string;
  createdAt: Date;
  eventId: string;
  eventTitle: string;
  totalAmount: string;
};

export type CategoryTypes = {
  id: string;
  name: string;
};

// Category props for category actions
export type CreateCategoryProps = {
  categoryName: string;
};

export type CreateEventProps = {
  userId: string;
  event: {
    title: string;
    categoryId: string;
    description: string;
    location: string;
    isOnline: boolean;
    imageUrl: string;
    isFree: boolean;
    price: string;
    startTime: Date;
    endTime: Date;
    url?: string;
  };
  path: string;
};
export type UpdateEventProps = {
  eventId: string;
  userId: string;
  event: {
    title: string;
    categoryId: string;
    description: string;
    location: string;
    imageUrl: string;
    isFree: boolean;
    price: string;
    startTime: Date;
    endTime: Date;
    url?: string;
  };
  path: string;
};

export type EventProps = {
  id: string;
  categoryId: string;
  userId: string;
  orderId: string;
  title: string;
  description: string;
  isArchived: boolean;
  location: string;
  imageUrl: string;
  isFree: boolean;
  price: string;
  startTime: Date;
  endTime: Date;
  url?: string;
  createdAt: Date;
  updatedAt: Date;
  category: CategoryTypes;
  organizer: { id: string; first_name: string; last_name: string };
};

export type GetAllEventsParams = {
  query: string;
  category: string;
  limit?: number;
  page: number | string;
};

export type RelatedEventsByCategoryProps = {
  categoryId: string;
  eventId: string;
  limit?: number;
  page: number | string;
};

export type GetEventByUserProps = {
  userId: string;
  limit?: number;
  page: number;
};

export type CheckoutOrderProps = {
  eventTitle: string;
  eventId: string;
  isFree: boolean;
  price: string;
  buyerId: string;
};

export type CreateOrderProps = {
  buyerId: string;
  createdAt: Date;
  eventId: string;
  stripeId: string;
  totalAmount: string;
};

export type GetOrdersByUserProps = {
  userId: string;
  limit?: number;
  page: number | string | null;
};

export type GetOrdersByEventProps = {
  eventId: string;
  searchText: string;
};

export type SearchParamsProps = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

export type UrlQueryParams = {
  key: string;
  params: string;
  value: string | null;
};

export type RemoveUrlQueryParams = {
  params: string;
  keysToRemove: string[];
};
