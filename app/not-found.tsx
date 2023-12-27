import Link from 'next/link'
 
const NotFound = () => {
  return (
    <div className='w-full h-[100vh] gap-8 flex flex-col items-center justify-center'>
      <h2 className="text-2xl">404</h2>
      <p className="text-sm">访问的资源不存在</p>
      <Link href="/">返回首页 -&gt; </Link>
    </div>
  )
}

export default NotFound;
