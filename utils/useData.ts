'use client'
import { useQuery } from '@tanstack/react-query';

import {BeerData, getList, getRandomList} from './getData';
import { useEffect, useState } from 'react';

export const useList = (queryStr?: string, initialData?: BeerData[]) => {
  const {
    data,
    isLoading,
  } = useQuery({
    queryKey: ['beers', 1, 10, queryStr],
    queryFn: getList,
    initialDataUpdatedAt: 5000,
    initialData: () => initialData,
    placeholderData: (previousValue) => previousValue || initialData
  })

  return {
    data,
    loading: isLoading
  }
}

export const useRandomList = (interval: number, initialData?: BeerData[]) => {
  const [enabled, setEnabled] = useState(false);

  // delay to get random data
  useEffect(() => {
    setTimeout(() => {
      setEnabled(true);
    }, interval)
  }, [interval])

  const {data} = useQuery({
    queryKey: ['beers', 1, 2],
    queryFn: getRandomList,
    initialDataUpdatedAt: 5000,
    placeholderData: (previousValue) => previousValue || initialData,
    initialData: () => initialData,
    refetchInterval: interval,
    enabled
  })

  return {data};
}
