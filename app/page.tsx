import {QueryClient} from '@tanstack/react-query';

import {getList} from '@/utils/getData';
import TopBar from './_topBar';
import ItemList from './_itemList';

const Home = async () => {
  const queryClient = new QueryClient();
  const data = await queryClient.fetchQuery({
    queryKey: ['beers', 1, 10],
    queryFn: getList,
  });
 
  return (
    <div className="max-w-2xl ml-auto mr-auto pt-10">
      <h1 className="font-bold text-3xl text-cyan-500 mb-8">Beam</h1>
      <TopBar data={[data?.[0], data?.[1]]} />
      <ItemList data={data} />
    </div>
  )
}

export default Home
