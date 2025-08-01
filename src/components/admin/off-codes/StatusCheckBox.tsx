"use client";

interface props {
  isActive: boolean;
  setIsActive: (isActive: boolean) => void;
  title?: string;
}

export default function StatusCheckBox({
  isActive,
  setIsActive,
  title,
}: props) {
  return (
    <div className='flex gap-3 items-center'>
      <label className='container'>
        <input
          type='checkbox'
          checked={isActive}
          onChange={() => setIsActive(!isActive)}
        />
        <div className='checkmark'>
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='ionicon'
            viewBox='0 0 512 512'>
            <title>Checkmark</title>
            <path
              fill='none'
              stroke='currentColor'
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='32'
              d='M416 128L192 384l-96-96'
            />
          </svg>
        </div>
      </label>
      <p>{title ? title : "وضعیت"}</p>
    </div>
  );
}
