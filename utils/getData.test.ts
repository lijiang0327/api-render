import {getList, getRandomList, getDetail} from './getData';
import http from './http';

jest.mock('./http');

describe('getData', () => {
  afterAll(() => {
    jest.resetAllMocks();
  });

  it('getList function should get data correctly', async () => {
    const mockData = [{name: 'foo', id: 1}, {name: 'bar', id: 2}];

    (http.get as jest.Mock).mockReturnValueOnce({data: mockData});

    const data = await getList(1, 10);

    expect(data).toStrictEqual(mockData);
  })

  it('getRandomList function should get data correctly', async () => {
    const mockData = [{name: 'foo', id: 1}, {name: 'bar', id: 2}];

    (http.get as jest.Mock).mockReturnValueOnce({data: mockData});

    const data = await getRandomList();

    expect(data).toStrictEqual(mockData);
  })


  it('getRandomList should get empty array if api error', async () => {
    const mockData = [{name: 'foo', id: 1}];

    (http.get as jest.Mock).mockRejectedValue({data: mockData});

    const data = await getRandomList();

    expect(data).toStrictEqual([]);
  })

  it('getDetail function should get data correctly', async () => {
    const mockData = [{name: 'foo', id: 1}];

    (http.get as jest.Mock).mockReturnValueOnce({data: mockData});

    const data = await getDetail('1');

    expect(data).toStrictEqual(mockData[0]);
  })
})