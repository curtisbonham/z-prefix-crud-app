import { useNavigate } from 'react-router-dom'
import { useReactTable, getCoreRowModel, getPaginationRowModel, getSortedRowModel,  getExpandedRowModel,  } from '@tanstack/react-table';
import './InventoryTable.css'


export default function AllInventoryTable({allInventory}) {

  const navigate = useNavigate();

  const columns = [
    {
      accessorKey: 'id',
      header: 'ID',
    },
    {
      accessorKey: 'itemname',
      header: 'Item Name',
    },
    {
      accessorKey: 'quantity',
      header: 'Quantity',
      cell: ({ row }) => {
        const value = row.original.quantity;
        return <div>{value?.toLocaleString()}</div>;
      }
    },
    {
      accessorKey: 'description',
      header: 'Description',
      cell: ({ row }) => {
        const value = row.original.description;
        return (
          <div title={value}>
          {value && value.length > 100 ? `${value.substring(0, 100)}...` : value}
          </div>
        );
      },
    },
  ];

  const table = useReactTable({
    data: allInventory,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    enableEditing: true,
    enablePagination: true,
  })

  return (
    <>
    <table>
      <thead>
        {table.getHeaderGroups().map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <th key={header.id}>
                {header.isPlaceholder ? null : header.column.columnDef.header}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}
          onClick={() => navigate(`/details/item/${row.original.id}`)}
          >
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>
                {cell.column.columnDef.cell
                ? cell.column.columnDef.cell(cell)
              : cell.getValue()}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
    </>
  )
}

