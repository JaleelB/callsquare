import React from 'react';

export default function Avatar ({ name }: { name: string }) {
  const initials = getInitials(name);
  return (
    <div 
        className='
            flex justify-center items-center font-bold min-w-[100px] min-h-[100px] w-[15vw] h-[15vw] 
            max-w-[300px] max-h-[300px] rounded-full text-gray-200 bg-neutral-700 text-[6vw] sm:text-[4vw]
            absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2
        '
    >
        {initials}
    </div>
  );
}

// @see https://stackoverflow.com/questions/33076177/getting-name-initials-using-js
const getInitials = (name: string) => {
  const allNames = name.trim().split(' ');
  const initials = allNames.reduce((acc, curr, index) => {
    if (index === 0 || index === allNames.length - 1) {
      acc = `${acc}${curr.charAt(0).toUpperCase()}`;
    }
    return acc;
  }, '');
  return initials;
};