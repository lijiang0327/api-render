'use client'
import { useQuery } from '@tanstack/react-query';

import {BeerData, getList, getRandomList} from './getData';

export const useList = (queryStr?: string, initialData?: BeerData[]) => {
    const {
      data,
      isLoading,
    } = useQuery({
      queryKey: ['beers', 1, 10, queryStr],
      queryFn: getList,
      placeholderData: (previousValue) => previousValue || initialData
    })
  
    return {
      data,
      loading: isLoading
    }
}

export const useRandomList = (interval: number, initialData?: BeerData[]) => {
  const {data} = useQuery({
    queryKey: ['beers', 1, 2],
    queryFn: getRandomList,
    placeholderData: (previousValue) => previousValue || initialData,
    refetchInterval: interval,
  })

  return {data};
}
