import classNames from 'classnames';
import { ITableProps } from './types';

export default function Table(props: Readonly<ITableProps>) {
  const { headers, rows, onRowClick } = props;
  const isClickable = Boolean(onRowClick)

  function handleRowClick(row: unknown) {
    onRowClick?.(row)
  }

  return (
    <div className='relative overflow-x-auto'>
      <table className='w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400'>
        <thead className='text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
          <tr>
            {headers.map((header) => (
              <th key={header.value} scope='col' className='px-6 py-3'>
                {header.text}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {rows.map((row) => (
            <tr
              key={row.id}
              className={classNames('bg-white border-b dark:bg-gray-800 dark:border-gray-700', {
                'hover:bg-gray-50 dark:hover:bg-gray-600 cursor-pointer': isClickable
              })}
              onClick={() => handleRowClick(row)}
            >
              {headers.map((header) => {
                const cellValue = row[header.value]

                return (
                  <td key={header.value} className='px-6 py-4'>
                    {cellValue}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
