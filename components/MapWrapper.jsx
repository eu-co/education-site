'use client';

import dynamic from 'next/dynamic';

// We perform the dynamic import HERE, inside the Client environment
const TimeTravelMap = dynamic(() => import('@/components/TimeTravelMap'), { 
  ssr: false,
  loading: () => (
    <div className="h-[500px] w-full bg-gray-100 animate-pulse rounded-3xl flex items-center justify-center text-gray-400">
      Loading historical map...
    </div>
  )
});

export default function MapWrapper({ composers }) {
  return <TimeTravelMap composers={composers} />;
}