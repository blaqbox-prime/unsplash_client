import React from 'react'

const CollectionSkeleton = () => {
  return (
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full mx-auto mt-16 transition-all duration-300 ease-in-out'>
          {[1,2,3, 4, 5, 6].map((_) => (
              <div key={_} className="w-full h-72 mb-4 bg-gray-200 dark:bg-gray-800 rounded-md animate-pulse">
                  <div className="h-full flex items-center justify-center">
                      <span className="text-gray-400">Loading...</span>
                  </div>
              </div>
          ))}
    </div>
  );
};

export default CollectionSkeleton
