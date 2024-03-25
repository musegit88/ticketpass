import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import qs from "query-string";
import { RemoveUrlQueryParams, UrlQueryParams } from "@/types/types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const convertFileToUrl = (file: File) => URL.createObjectURL(file)

export const formatPrice = (price: string) => {
  const amount = parseFloat(price)
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(amount)
  return formattedPrice
}

export const addUrlQuery = ({ params, key, value }: UrlQueryParams) => {
  const currentUrl = qs.parse(params);

  currentUrl[key] = value;

  return qs.stringifyUrl(
    {
      url: window.location.pathname,
      query: currentUrl,
    },
    { skipNull: true }
  );
};

export const removeKeysFromUrlQuery = ({ params, keysToRemove }: RemoveUrlQueryParams) => {
  const currentUrl = qs.parse(params);
  keysToRemove.forEach((key: string | number) => {
    delete currentUrl[key];
  });
  return qs.stringifyUrl({
    url: window.location.pathname,
    query: currentUrl,
  });
};