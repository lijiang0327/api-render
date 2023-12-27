'use client'

import {FC, useState, ChangeEventHandler} from 'react';
import Link from 'next/link';
import {debounce} from 'lodash';
import {Motion, spring} from 'react-motion';

import {BearData, getList, getListController} from '@/utils/getData';

type ItemListProps = {
  data: BearData[]
}

const ItemList: FC<ItemListProps> = ({data}) => {
  const [itemData, setItemData] = useState(data);
  const [loading, setLoading] = useState(false);

  const onChangeHandler: ChangeEventHandler<HTMLInputElement> = debounce(async (event) => {
    if (loading) {
      getListController.abort();
    }

    setLoading(true);
    const queryKey = event.target.value;

    try {
      setItemData(await getList(1, 10, queryKey));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, 500);
 
  return <div className="mt-8 overflow-hidden">
    <input 
      type="text"
      aria-label='search'
      placeholder="Search..." 
      className="border w-full rounded-lg h-12 pl-4 mb-4"   
      onChange={onChangeHandler}
    />
    <Motion
      key={itemData?.reduce((pre, cur) => pre + cur.id, '')}
      defaultStyle={{opacity: 0, offset: 10}}
      style={{
        opacity: spring(1),
        offset: spring(0)
      }}
    >
      {(style) => {
        return <>
          {!!itemData?.length && itemData.map((d, index) => {
            return (
              <Link key={d.id} href={`/detail/${d.id}`}>
                <div 
                  className="flex justify-between border-b p-4 cursor-pointer hover:bg-cyan-50"
                  style={{
                    ...style,
                    transform: `translateX(${(1 - style.opacity) * 50}%)`,
                    transition: `all ${20 * (index + 1)}ms linear`
                  }}
                >
                  <span>{d.name}</span>
                  <span>{d.first_brewed}</span>
                </div>
              </Link>
            )
          })}
        </>
      }}
    </Motion>
  </div>
}

export default ItemList;
