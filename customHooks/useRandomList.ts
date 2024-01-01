'use client'
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import {BeerData, getRandomList} from '@/utils/getData';


const useRandomList = (interval: number, initialData?: BeerData[]) => {
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
    placeholderData: (previousValue) => previousValue ?? initialData,
    refetchInterval: interval,
    enabled
  })

  return {
    data,
    setEnabled
  };
}

export default useRandomList;
