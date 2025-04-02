import { useState, useEffect } from 'react'
import {Link, Route, Routes} from 'react-router-dom'
import { useReactTable, getCoreRowModel, getPaginationRowModel, getSortedRowModel,  getExpandedRowModel,  } from '@tanstack/react-table';
import './AllInventoryTable.css'


function AllInventoryTable({allInventory}) {

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
    },
    {
      accessorKey: 'description',
      header: 'Description',
      cell: ({ getValue }) => {
        const value = getValue();
        return value && value.length > 100 ? `${value.substring(0, 100)}...` : value;
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
        {table.getRowModel().rows.map(row => (
          <tr key={row.id}>
            {row.getVisibleCells().map(cell => (
              <td key={cell.id}>{cell.getValue()}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
    </>
  )
}

export default AllInventoryTable