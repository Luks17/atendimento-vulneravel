"use client";

import Link from "next/link";
import type Response from "@/lib/Response";
import type { SimpleReturn } from "@/lib/Response";
import { useRouter } from "next/router";

interface MenuHeaderProps {
  editUrl?: string;
  deleteHandler?: (id: string) => Promise<Response<SimpleReturn>>;
  deleteTarget: string;
}

export default function MenuHeader({
  editUrl,
  deleteHandler,
  deleteTarget,
}: MenuHeaderProps) {
  const router = useRouter();

  function onDeleteItemClick() {
    if (deleteHandler) deleteHandler(deleteTarget);

    router.back();
  }

  return (
    <div className="flex justify-end gap-x-3 pb-3">
      {editUrl && (
        <Link className="btn btn-secondary" href={editUrl}>
          Editar
        </Link>
      )}
      {deleteHandler && (
        <button
          type="button"
          onClick={onDeleteItemClick}
          className="btn btn-secondary"
        >
          Deletar
        </button>
      )}
    </div>
  );
}
