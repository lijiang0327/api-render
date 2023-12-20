import {getList, getRandomList} from '@/utils/getData';
import TopBar from './_topBar';
import ItemList from './_itemList';

const Home = async () => {
  const [data, randomData] = await Promise.all([getList(1, 10), getRandomList()])
 
  return <div className="">
    <h1>Beam</h1>
    <TopBar data={randomData} />
    <ItemList data={data} />
  </div>
}

export default Home