"use client";

import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";

interface TableActionsProps {
  onEdit: () => void;
  onDelete: () => void;
}

export default function TableActions({ onEdit, onDelete }: TableActionsProps) {
  return (
    <div className='flex items-center gap-2'>
      <button
        onClick={onEdit}
        className='text-darker-black border border-darker-black/20 hover:text-darker-black hover:bg-darker-black/10 px-3 py-2 rounded'>
        <CiEdit />
      </button>
      <button
        onClick={onDelete}
        className='text-red px-3 py-2 rounded border border-red/40 hover:bg-red hover:text-light'>
        <MdDeleteOutline />
      </button>
    </div>
  );
}
