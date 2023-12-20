import http from './http';
import {useMutation} from 'react-query';

export const getList = async (page: number, per_page: number, bearName?: string) => {
  const result = await http.get('/v2/beers', {params: {page, per_page, bearName}});

  return result.data;
}

export const getDetail = async () => {};

let getRandomListTryCount = 0;
export const getRandomList = async () => {
  const randomPageIndex = Math.floor(Math.random() * 50);

  let result: any[] = [];
  const getData = async () => {
    getRandomListTryCount ++;
    try {
      const list = await http.get('v2/beers/', {params: {page: randomPageIndex, per_page: 2}});
      result = list.data;
    } catch (error) {
      if (getRandomListTryCount < 3) {
        await getData();
      }
    }
  }

  await getData();
  getRandomListTryCount = 0;
  return result;
}

export default getList;
