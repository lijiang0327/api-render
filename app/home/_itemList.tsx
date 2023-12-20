'use client'

import {FC, useState} from 'react';

type ItemListProps = {
  data: any[]
}

const ItemList: FC<ItemListProps> = ({data}) => {

  const [itemData, setItemData] = useState(data);

  const onChangeHandler = () => {
    setItemData([]);
  }
 
  return <div>
    <input onChange={onChangeHandler} />
    {!!itemData?.length && itemData.map((d) => {
      return <div key={d.id}>{d.name}</div>
    })}
  </div>
}

export default ItemList;
