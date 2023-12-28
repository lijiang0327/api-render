'use client'

import {FC} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {Motion, spring} from 'react-motion';

import {BeerData} from '@/utils/getData';
import {useRandomList} from '@/utils/useData';

type TopBarProps = {
  data: BeerData[]
}

const TopBar: FC<TopBarProps> = ({data}) => {
  const {data: listData} = useRandomList(5000, data);

  return <div className="flex gap-4">
    <Motion
      key={listData?.reduce((pre, cur) => pre + cur.id, '')}
      defaultStyle={{opacity: 0}}
      style={{
        opacity: spring(1)
      }}
    >
      {(style) => {
        return <>
          {
            !!listData?.length && listData.map((d) => {
              return (
                <div 
                  className="flex-1 border rounded-md p-4 flex gap-4 h-56 overflow-hidden" 
                  key={d.id}
                >
                  <div className="w-12 relative" style={{...style, transform: `translateY(${(1-style.opacity) * 100}%)`}}>
                    <Image fill src={d.image_url} alt={d.name} />
                  </div>
                  <div 
                    className="flex flex-col justify-between"
                    style={{...style, transform: `translateX(${(1-style.opacity) * 100}%)`}}
                  >
                    <div>
                      <h3>{d.name}</h3>
                      <span>{d.first_brewed}</span>
                    </div>
                    <Link className="text-cyan-500" href={`/detail/${d.id}`}>View Detail</Link>
                  </div>
                </div>
              )
            })
          }
        </> 
      }}
    </Motion>
  </div>
}

export default TopBar;
