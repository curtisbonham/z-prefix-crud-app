import { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import './InventoryTable.css';
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getExpandedRowModel,
} from '@tanstack/react-table';

export default function UserInventoryTable({ userInventory, user }) {

  const navigate = useNavigate();

  const [data, setData] = useState(userInventory);
  const [editingCell, setEditingCell] = useState(null);


  //HANDLES ALLOWING THE USER TO TYPE WHILE MAKING EDITS IN THE TABLE
  const handleLocalEdit = (rowIndex, columnId, value) => {
    const updatedInventory = [...data];
    updatedInventory[rowIndex][columnId] = value;
    setData(updatedInventory);
  }

  //HANDLES SENDING THE UPDATES THAT ARE MADE BY THE USER TO THE SERVER
  const handleSubmitEdit = (rowIndex, columnId, value) => {
      const updatedItem = {
      id: data[rowIndex].id,
      [columnId]: value,
    };

    fetch(`http://localhost:3001/updateInventory/${updatedItem.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedItem),
    })
    .then((response) => {
      if(!response.ok){
        throw new Error('Failed to update inventory');
      }
      return response.json();
    })
    .then((data) => {
      console.log('Update successful', data)
    })
    .catch((error) => {
      console.error('Error updating inventory:', error);
    });
  };

  //HANDLES TRIGGERING THE PATCH CALL WHEN THE USER CLICKS ENTER AFTER EDITING
  const handleKeyDown = (e, rowIndex, columnId, value) => {
    if (e.key === 'Enter') {
      handleSubmitEdit(rowIndex, columnId, value);
      setEditingCell(null);
    }
  }

  //HANDLES TRIGGERING THE PATCH CALL WHEN THE USER CLICKS OUTSIDE OF THE EDIT BOX
  const handleBlur = (rowIndex, columnId, value ) => {
    handleSubmitEdit(rowIndex, columnId, value);
    setEditingCell(null);
  }

  //HANDLES DELETING AN ITEM FROM THE USER INVENTORY
  const deleteItem = (id) => {
    fetch(`http://localhost:3001/deleteItem/${user.id}/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
    .then((response) => {
      if(!response.ok){
        throw new Error('Failed to delete item');
      }
      return response.json();
    })
    .then((data) => {
      setData(data.filter(item => item.id !== id));
    })
    .catch((error) => {
      console.error('Error deleting item:', error);
    });
  }

  //HANDLES SETTING UP THE TABLE
  const columns = useMemo(
    () => [
      {
        accessorKey: 'id',
        header: 'ID',
      },
      {
        accessorKey: 'itemname',
        header: 'Item Name',
        cell: ({ row, column }) => {
          const isEditing = editingCell?.rowIndex === row.index && editingCell?.columnId === column.id;
          return isEditing ? (
            <input
              value={row.original[column.id]}
              onChange={(e) => handleLocalEdit(row.index, column.id, e.target.value)}
              onBlur={(e) => handleBlur(row.index, column.id, e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, row.index, column.id, e.target.value)}
              autoFocus
            />
          ) : (
            <div onClick={() => setEditingCell({ rowIndex: row.index, columnId: column.id })}>
              {row.original[column.id]}
            </div>
          );
        },
      },
      {
        accessorKey: 'quantity',
        header: 'Quantity',
        cell: ({ row, column }) => {
          const isEditing = editingCell?.rowIndex === row.index && editingCell?.columnId === column.id;
          const value = row.original[column.id];
          return isEditing ? (
            <input
              type="number"
              value={value}
              onChange={(e) => handleLocalEdit(row.index, column.id, e.target.value)}
              onBlur={(e) => handleBlur(row.index, column.id, e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, row.index, column.id, e.target.value)}
              autoFocus
            />
          ) : (
            <div onClick={() => setEditingCell({ rowIndex: row.index, columnId: column.id })}>
              {value?.toLocaleString()}
            </div>
          );
        },
      },
      {
        accessorKey: 'description',
        header: 'Description',
        cell: ({ row, column }) => {
          const isEditing = editingCell?.rowIndex === row.index && editingCell?.columnId === column.id;
          const value = row.original[column.id];
          return isEditing ? (
            <input
              value={value}
              onChange={(e) => handleLocalEdit(row.index, column.id, e.target.value)}
              onBlur={(e) => handleBlur(row.index, column.id, e.target.value)}
              onKeyDown={(e) => handleKeyDown(e, row.index, column.id, e.target.value)}
              autoFocus
            />
          ) : (
            <div
              title={value}
              onClick={() => setEditingCell({ rowIndex: row.index, columnId: column.id })}>
              {value && value.length > 100 ? `${value.substring(0, 100)}...` : value}
            </div>
          );
        },
      },
    ],
    [data, editingCell]
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
  });

  return (
    <>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder ? null : header.column.columnDef.header}
                </th>
              ))}
              <th>Actions</th>
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}
                onDoubleClick={() => navigate(`/details/item/${row.original.id}`)}>

                  {cell.column.columnDef.cell
                    ? cell.column.columnDef.cell(cell)
                    : cell.getValue()}
                </td>
              ))}
              <td>
                <button className='delete-btn' onClick={() => deleteItem(row.original.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
