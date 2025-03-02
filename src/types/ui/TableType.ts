export interface TableColumn {
  name: string;
  field: string;
}

export interface TableRow {
  name: string;
  email: string;
  phone: string;
}

export interface TablePagination {
  current_page: number;
  last_page: number;
  total: number;
}