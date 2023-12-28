import {QueryClient} from '@tanstack/react-query'

import {getList, getRandomList, getDetail} from './getData';
import http from './http';

jest.mock('./http');

const queryClient = new QueryClient();

describe('getData', () => {
  afterAll(() => {
    jest.resetAllMocks();
  });

  it('getList function should get data correctly', async () => {
    const mockData = [{name: 'foo', id: 1}, {name: 'bar', id: 2}];

    (http.get as jest.Mock).mockReturnValueOnce({data: mockData});

    const data = await queryClient.fetchQuery({
      queryKey: ['beers', 1, 10],
      queryFn: getList
    });

    expect(data).toStrictEqual(mockData);
  })

  it('getRandomList function should get data correctly', async () => {
    const mockData = [{name: 'foo', id: 1}, {name: 'bar', id: 2}];

    (http.get as jest.Mock).mockReturnValueOnce({data: mockData});

    const data = await queryClient.fetchQuery({
      queryKey: ['beers'],
      queryFn: getRandomList
    });

    expect(data).toStrictEqual(mockData);
  })


  it('getRandomList should get empty array if api error', async () => {
    const mockData = [{name: 'foo', id: 1}];

    (http.get as jest.Mock).mockRejectedValue({data: mockData});

    const data = await queryClient.fetchQuery({
      queryKey: ['beers'],
      queryFn: getRandomList
    });

    expect(data).toStrictEqual([]);
  })

  it('getDetail function should get data correctly', async () => {
    const mockData = [{name: 'foo', id: 1}];

    (http.get as jest.Mock).mockReturnValueOnce({data: mockData});

    const data = await queryClient.fetchQuery({
      queryKey: ['detail', 1],
      queryFn: getDetail,
    });

    expect(data).toStrictEqual(mockData[0]);
  })
})