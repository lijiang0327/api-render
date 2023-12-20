import Link from 'next/link';

import { getDetail } from "@/utils/getData";

const Detail = async ({params}: {params: {id: string}}) => {
  const data = await getDetail(params.id);

  return <div className="max-w-2xl ml-auto mr-auto pt-10">
    <div>
      <Link href="/home" className="cursor-pointer font-bold text-3xl text-cyan-500">back</Link>
    </div>
    <div className="flex gap-4 mt-12">
      <div className="w-16">
        <img className="w-16" src={data.image_url} alt="image" />
      </div>
      <div className="flex-1">
        <h1 className="mb-4">{data.name}</h1>
        <span>{data.first_brewed}</span>
        <p className="mt-10">{data.description}</p>
      </div>
    </div>
  </div>
}

export default Detail;
