import qs from "qs";
import { getStrapiURL } from "./api-helpers";

export async function fetchAPI(
  path: string,
  urlParamsObject = {},
  options = {},
  locale?: string,
) {
  try {
    const token = import.meta.env.DEV
      ? process.env.STRAPI_API_TOKEN_DEV
      : process.env.STRAPI_API_TOKEN_PROD;

    const paramsWithLocale = locale
      ? { ...urlParamsObject, locale }
      : urlParamsObject;

    const mergedOptions = {
      headers: {
        "Content-Type": "application/json",
        ...(token ? { "Authorization": `Bearer ${token}` } : {}),
      },
      ...options,
    };

    const queryString = qs.stringify(paramsWithLocale);
    const requestUrl = `${getStrapiURL(
      `/api${path}${queryString ? `?${queryString}` : ""}`,
    )}`;

    const response = await fetch(requestUrl, mergedOptions);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    throw new Error(
      `Please check if your server is running and you set all the required tokens.`,
    );
  }
}
