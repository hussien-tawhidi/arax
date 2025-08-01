export interface ProductSpec {
  key: string;
  value: string;
}

interface ProductSpecsProps {
  specs: ProductSpec[];
}

export default function ProductSpecs({ specs }: ProductSpecsProps) {
  if (!specs?.length) return null;

  return (
    <div className='mt-8  border-t pt-4'>
      <h2 className='text-lg font-semibold mb-2'>مشخصات محصول</h2>
      <table className='w-full text-sm border-separate border-spacing-y-2'>
        <tbody>
          {specs.map((item, index) => (
            <tr
              key={index}
              className='bg-darker-black/5 md:text-sm text-[12px]'>
              <th className='md:p-5 p-3 text-right w-1/4'>{item.key}</th>
              <td className='md:p-5 p-3'>{item.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
    </div>
  );
}
