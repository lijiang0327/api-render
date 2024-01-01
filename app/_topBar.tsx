'use client'

import {FC} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {motion} from 'framer-motion';

import {BeerData} from '@/utils/getData';
import useRandomList from '@/customHooks/useRandomList';

type TopBarProps = {
  data: BeerData[]
}

const TopCard = ({data}: {data: BeerData}) => {
  const {id, image_url, name, first_brewed} = data;

  const textAnimations = {
    initial: {opacity: 0.5, x: 50},
    animate: {opacity: 1, x: 0},
    transition: {type: 'spring', stiffness: 300, damping: 30}
  }

  const imageAnimations = {
    initial: {opacity: 0.5, y: 50},
    animate: {opacity: 1, y: 0},
    transition: {type: 'spring', stiffness: 300, damping: 20}
  }


  return (
    <div
      className="flex-1 border rounded-md p-4 flex gap-4 h-56 overflow-hidden" 
    >
      <motion.div
        {...imageAnimations}
        className="w-12 relative"
      >
        <Image fill src={image_url} alt={name} />
      </motion.div>
      <motion.div 
        {...textAnimations}
        className="flex flex-col justify-between"
      >
        <div>
          <h3>{name}</h3>
          <span>{first_brewed}</span>
        </div>
        <Link className="text-cyan-500" href={`/detail/${id}`}>View Detail</Link>
      </motion.div>
    </div>
  )
}

const TopBar: FC<TopBarProps> = ({data}) => {
  const {data: listData, setEnabled} = useRandomList(10000, data);

  return (
    <div 
      className="flex gap-4 overflow-hidden"
      onMouseOver={() => setEnabled(false)}
      onMouseOut={() => setEnabled(true)}
      onFocus={() => setEnabled(false)}
      onBlur={() => setEnabled(true)}
    >
      {listData?.length && listData.map((d) => {
        return <TopCard data={d} key={d.id} />
      })}
    </div>
  )
}

export default TopBar;
