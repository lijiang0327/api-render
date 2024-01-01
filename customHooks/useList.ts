'use client'
import { useQuery } from '@tanstack/react-query';

import {BeerData, getList} from '@/utils/getData';

const useList = (queryStr?: string, initialData?: BeerData[]) => {
  const {
    data,
    isLoading,
  } = useQuery({
    queryKey: ['beers', 1, 10, queryStr],
    queryFn: getList,
    initialDataUpdatedAt: 5000,
    placeholderData: (previousValue) => previousValue ?? initialData
  })

  return {
    data,
    loading: isLoading
  }
}

export default useList;
