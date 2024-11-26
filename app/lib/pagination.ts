import { MetaPagination, Pagination } from "@/types";

export default function paginationUtil(url: URL) {
  const actualPage = Number(url.searchParams.get("page") ? url.searchParams.get("page") : 1);
  const searchParam = url.searchParams.get("search") ?? '';
  const sizeParam = Number(url.searchParams.get("size") ? url.searchParams.get("size") : 25);
  const subarea = url.searchParams.get("subarea") ?? '';
  return {
    actualPage,
    searchParam,
    sizeParam,
    subarea
  }
}

export function setNewPagination(pagination: MetaPagination | undefined): Pagination {
  if (!pagination) {
    return {}
  }
  const { page, pageCount, total } = pagination

  return {
    next: page + 1,
    prev: page - 1,
    total: pageCount,
    isFirt: page === 1,
    isLast: page === pageCount,
    actualPage: page,
    itemPerPage: total
  }
}


