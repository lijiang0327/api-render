'use client'

import {FC, useRef, useEffect, useState, useCallback} from 'react';

import {getRandomList} from '@/utils/getData';

type TopBarProps = {
  data: any[]
}

const TopBar: FC<TopBarProps> = ({data}) => {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [listData, setListData] = useState(data);

  const fetchData = useCallback(() => {
    if (timerRef.current) {
      return;
    }

    timerRef.current = setTimeout(async () => {
      const data = await getRandomList();
      if (data?.length) {
        setListData(data);
      }
      timerRef.current = null;
      fetchData();
    }, 10 * 1000);
  }, [])

  useEffect(() => {
    fetchData();
  }, [fetchData])

  return <div>
    {!!listData?.length && listData.map((d) => {
      return <div key={d.id}>{d.name}</div>
    })}
  </div>
}

export default TopBar;
