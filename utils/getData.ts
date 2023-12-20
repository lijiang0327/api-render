import axios from 'axios';

import http from './http';


export const getListController = new AbortController();

export const getList = async (page: number, per_page: number, beer_name?: string) => {
  const result = await http.get('/v2/beers', {
    params: {page, per_page, beer_name: beer_name || undefined},
    signal: getListController.signal
  });

  return result.data;
}

export const getDetail = async (id: string) => {
  const result = await http.get(`/v2/beers/${id}`);

  return result.data[0];
};

const sleep = async (second = 1) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(null);
    }, second * 1000);
  })
}
  
let getRandomListTryCount = 0;
export const getRandomList = async () => {
  const randomPageIndex = Math.floor(Math.random() * 50);

  let result: any[] = [];
  const getData = async () => {
    getRandomListTryCount ++;
    try {
      const list = await http.get('v2/beers', {params: {page: randomPageIndex, per_page: 2}});
      result = list.data;
    } catch (error) {
      if (getRandomListTryCount < 3) {
        await sleep();
        await getData();
      }
    }
  }

  await getData();
  getRandomListTryCount = 0;
  return result;
}

export default getList;
