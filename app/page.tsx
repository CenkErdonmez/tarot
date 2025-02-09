import Link from "next/link";

export default function Home() {
  return (
    <div className='flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-800 to-gray-900'>
      <div className=' flex flex-col justify-center items-center text-center space-y-6'>
        <h1 className='text-4xl sm:text-6xl font-bold text-white'>
          Tarot Reading Awaits
        </h1>
        <p className='text-lg sm:text-xl px-8 text-gray-300'>
          Unveil the mysteries of your past, present, and future.
        </p>
        <Link
          className='px-8 py-4 bg-purple-700 text-white font-bold rounded-xl shadow-lg hover:bg-purple-800 transition-all duration-300'
          href='/reading'
        >
          Start Your Reading
        </Link>
      </div>
    </div>
  );
}

