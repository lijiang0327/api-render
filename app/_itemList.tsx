'use client'

import {FC, useState, ChangeEventHandler} from 'react';
import Link from 'next/link';
import {motion} from 'framer-motion';
import {useDebounce} from '@uidotdev/usehooks';

import {BeerData} from '@/utils/getData';
import {useList} from '@/utils/useData';

type ItemListProps = {
  data: BeerData[]
}

const Item = ({data: {id, name, first_brewed}, index}: {data: BeerData, index: number}) => {
  const animations = {
    initial: {opacity: 0, x: (index + 1) * 50},
    animate: {opacity: 1, x: 0},
    transition: {type: 'spring', stiffness: 300, damping: 20}
  }

  return (
    <motion.div {...animations}>
      <Link key={id} href={`/detail/${id}`}>
        <div 
          className="flex justify-between border-b p-4 cursor-pointer hover:bg-cyan-50"
        >
          <span>{name}</span>
          <span>{first_brewed}</span>
        </div>
      </Link>
    </motion.div>
  )
}

const ItemList: FC<ItemListProps> = ({data}) => {
  const [queryStr, setQueryStr] = useState('');
  const debounceQueryStr = useDebounce(queryStr, 800);

  const {data: itemData} = useList(debounceQueryStr, data);

  const onChangeHandler: ChangeEventHandler<HTMLInputElement> = (e) => {
    setQueryStr(e.currentTarget.value);
  }
 
  return <div className="mt-8 overflow-hidden">
    <input 
      type="text"
      aria-label='search'
      placeholder="Search..." 
      className="border w-full rounded-lg h-12 pl-4 mb-4"   
      onChange={onChangeHandler}
    />
    {!!itemData?.length ? itemData.map((d, index) => {
      return (
        <Item data={d} index={index} key={d.name} />
      )
    }) : (
      <div
        className="flex items-center justify-center text-2xl text-slate-400 h-[200px]"
      >No Data</div>
    )}
  </div>
}

export default ItemList;
