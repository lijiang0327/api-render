'use client'

import {FC, useState, ChangeEventHandler} from 'react';
import Link from 'next/link';
import {Motion, spring} from 'react-motion';
import {useDebounce} from '@uidotdev/usehooks';

import {BeerData} from '@/utils/getData';
import {useList} from '@/utils/useData';
import isServerSide from '@/utils/isServerSide';

type ItemListProps = {
  data: BeerData[]
}

const ItemList: FC<ItemListProps> = ({data}) => {
  const [queryStr, setQueryStr] = useState('');
  const debounceQueryStr = useDebounce(queryStr, 800);

  const {data: itemData, loading} = useList(debounceQueryStr, data);

  const onChangeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    setQueryStr(e.currentTarget.value);
  }
 
  return <div className="mt-8 overflow-hidden">
    {
      loading && <div>loading</div>
    }
    <input 
      type="text"
      aria-label='search'
      placeholder="Search..." 
      className="border w-full rounded-lg h-12 pl-4 mb-4"   
      onChange={onChangeHandler}
    />
    <Motion
      key={itemData?.reduce((pre, cur) => pre + cur.id, '')}
      defaultStyle={{opacity: 0}}
      style={{
        opacity: spring(1),
      }}
    >
      {(style) => {
        return <>
          {!!itemData?.length ? itemData.map((d, index) => {
            return (
              <Link key={d.id} href={`/detail/${d.id}`}>
                <div 
                  className="flex justify-between border-b p-4 cursor-pointer hover:bg-cyan-50"
                  style={{
                    ...style,
                    transform: `translateX(${(1 - style.opacity * style.opacity) * 50}%)`,
                    transition: `all ${20 * (index + 1)}ms linear`
                  }}
                >
                  <span>{d.name}</span>
                  <span>{d.first_brewed}</span>
                </div>
              </Link>
            )
          }) : (
            <div
              className="flex items-center justify-center text-2xl text-slate-400 h-[200px]"
              style={{
                ...style,
                transform: `translateX(${(1 - style.opacity * style.opacity) * 50}%)`,
                transition: `all 20ms linear`
              }}
            >No Data</div>
          )}
        </>
      }}
    </Motion>
  </div>
}

export default ItemList;
