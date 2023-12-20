import {getList} from '@/utils/getData';
import TopBar from './_topBar';
import ItemList from './_itemList';

const Home = async () => {
  const [data] = await Promise.all([getList(1, 10)])
 
  return <div className="max-w-2xl ml-auto mr-auto pt-10">
    <h1 className="font-bold text-3xl text-cyan-500 mb-8">Beam</h1>
    <TopBar data={[data[0], data[1]]} />
    <ItemList data={data} />
  </div>
}

export default Home