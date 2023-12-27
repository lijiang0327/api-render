import Link from 'next/link';
import {notFound} from 'next/navigation';
import Image from 'next/image';

import { getDetail } from "@/utils/getData";

const Detail = async ({params}: {params: {id: string}}) => {
  const data = await getDetail(params.id);

  if (!data) {
    notFound();
  }

  return <div className="max-w-2xl ml-auto mr-auto pt-10">
    <div>
      <Link href="/" className="cursor-pointer font-bold text-3xl text-cyan-500">back</Link>
    </div>
    <div className="flex gap-4 mt-12">
      <div className="w-16 relative">
        <Image fill src={data.image_url} alt={data.name} />
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
