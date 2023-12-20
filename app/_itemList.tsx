'use client'

import {FC, useState, ChangeEventHandler} from 'react';
import {useRouter} from 'next/navigation';
import {debounce} from 'lodash';
import {Motion, spring} from 'react-motion';

import {getList, getListController} from '@/utils/getData';

type ItemListProps = {
  data: any[]
}

const ItemList: FC<ItemListProps> = ({data}) => {
  const [itemData, setItemData] = useState(data);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onChangeHandler: ChangeEventHandler<HTMLInputElement> = debounce(async (event) => {
    if (loading) {
      getListController.abort();
    }

    setLoading(true);
    const queryKey = event.target.value;
    const data = await getList(1, 10, queryKey);
    setLoading(false);
    setItemData(data);
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
              <div 
                onClick={() => router.push(`/detail/${d.id}`)} 
                key={d.id}
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
            )
          })}
        </>
      }}
    </Motion>
  </div>
}

export default ItemList;
