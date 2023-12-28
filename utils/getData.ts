import http from './http';

export type BeerData = {
  id: number
  image_url: string
  name: string
  description: string
  first_brewed: string
  [key: string]: unknown
}

export const getList = async ({queryKey, signal}: any) => {
  const [_, page, per_page, beer_name] = queryKey;

  try {
    const result = await http.get<BeerData[]>('/v2/beers', {
      params: {page, per_page, beer_name: beer_name || undefined},
      signal
    });
  
    return result.data;
  } catch {
    return []
  }
}

export const getDetail = async ({queryKey}: any) => {
  const result = await http.get<BeerData[]>(`/v2/beers/${queryKey[1]}`);

  return result.data?.[0];
}

export const getRandomList = async (queryParams: any) => {
  const randomPageIndex =  Math.floor((Math.random()) * 50) + 1;
  queryParams.queryKey[1] = randomPageIndex;

  return await getList(queryParams);
}
