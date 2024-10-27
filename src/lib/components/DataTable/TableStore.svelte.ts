
export type TableStoreFilters<T> = Record<keyof T, {
  filter: "select",
  values: T[keyof T][]
} | {
  filter: "date-range",
  values: { min: number, max: number },
  range: { min: number, max: number }
} | {
  filter: "number-range",
  values: { min: number, max: number },
  range: { min: number, max: number }
}>

export type TableStoreState<T> = {
  pageNumber: number;
  rowsPerPage: number;
  search: Record<keyof T, string> | null,
}
export type TableStoreSort<T> = null | {
  by: keyof T,
  asc: boolean
}
export type TableStoreApiResponse<T extends Record<string, unknown>> = { count: number, rows: T[] }

export default class <T extends Record<string, unknown>> {

  baseRoute = $state("")
  rows = $state<T[]>([])
  count = $state(0)
  filters = $state<TableStoreFilters<T>>({} as TableStoreFilters<T>)
  state = $state({
    pageNumber: 0,
    rowsPerPage: 10,
    search: {}
  } as TableStoreState<T>)

  visibleRows = $derived.by(() => {
    let res = this.rows.filter((row) => {
      for (let rowKey of Object.keys(this.filters)) {
        let key = rowKey as keyof T
        if (this.filters[key].filter === "select" && !this.filters[key].values.includes(row[key])) {
          return false
        } else if (this.filters[key].filter === "number-range" && typeof row[key] === "number") {
          if (row[key] < this.filters[key].values.min || row[key] > this.filters[key].values.max) {
            return false
          }
        } else if (this.filters[key].filter === "date-range") {
          let seconds = new Date(String(row[key])).getTime()
          if (seconds < this.filters[key].values.min || seconds > this.filters[key].values.max) {
            return false
          }
        }
      }
      return true
    })
    if (this.sort) {
      let { asc, by } = this.sort
      if (asc) {
        res = res.sort((a, b) => a[by] > b[by] ? 1 : -1)
      } else {
        res = res.sort((a, b) => a[by] < b[by] ? 1 : -1)
      }
    }
    return res.slice(
      this.state.pageNumber * this.state.rowsPerPage,
      (this.state.pageNumber + 1) * this.state.rowsPerPage
    )
  })
  sort = $state(null as TableStoreSort<T> | null)
  pageCount = $derived(Math.ceil(this.count / this.state.rowsPerPage))
  pages = $derived.by(() => {
    const pages = Array.from(Array(Math.ceil(this.count / this.state.rowsPerPage))).map((_, i) => {
      return i + 1;
    });
    if (pages.length <= 7) {
      return pages;
    }
    const ellipse = null;
    const firstPage = 1;
    const lastPage = pages.length;
    if (this.state.pageNumber <= 4) {
      return [
        ...pages.slice(0, 5),
        ellipse,
        lastPage
      ];
    }
    else if (this.state.pageNumber < pages.length - 3) {
      return [
        firstPage,
        ellipse,
        ...pages.slice(this.state.pageNumber - 2, this.state.pageNumber + 1),
        ellipse,
        lastPage
      ];
    }
    else {
      return [
        firstPage,
        ellipse,
        ...pages.slice(pages.length - 5, pages.length)
      ];
    }
  })

  constructor({
    baseRoute,
    rows,
    count,
    filters,
    state = null,
    sort = null }: {
      baseRoute: string,
      rows: T[],
      count: number,
      filters: TableStoreFilters<T>,
      state?: TableStoreState<T> | null,
      sort?: TableStoreSort<T>
    }) {
    this.baseRoute = baseRoute
    this.rows = rows
    this.count = count
    this.filters = filters
    if (state) {
      this.state = {
        ...this.state,
        ...state,
      }
    } else {
      this.state = {
        ...this.state,
      }
    }
    if (sort) {
      this.sort = sort
    }
  }

  addSelectFilter({ col, value }: { col: keyof T, value: T[keyof T] }) {
    if (this.filters[col].filter !== "select") return
    this.filters[col].values.push(value)
  }

  removeSelectFilter({ col, value }: { col: keyof T, value: T[keyof T] }) {
    if (this.filters[col].filter !== "select") return
    this.filters[col].values.filter((filterValue) => filterValue !== value)
  }

  setRangeFilter({ col, min, max }: { col: keyof T, min?: number, max?: number }) {
    if (this.filters[col].filter !== "date-range" && this.filters[col].filter !== "number-range") return
    this.filters[col].values.min = min ?? this.filters[col].range.min
    this.filters[col].values.max = max ?? this.filters[col].range.max
  }

  clearFilters() {
    for (let key of Object.keys(this.filters)) {
      this.resetColFilters(key)
    }
  }

  resetColFilters(key: keyof T) {
    if (this.filters[key].filter === "select") {
      this.filters[key].values = []
    } else {
      this.filters[key].values.min = this.filters[key].range.min
      this.filters[key].values.max = this.filters[key].range.max
    }
  }

  resetCol(key: keyof T) {
    this.resetColFilters(key)
    if (this.sort?.by === key) {
      this.sort = null
    }
  }

  setPage(value: 'previous' | 'next' | number | null) {
    if (value === null) return;
    if (value === 'previous') {
      this.state.pageNumber -= 1;
    } else if (value === 'next') {
      this.state.pageNumber += 1;
    } else if (typeof value === 'number') {
      this.state.pageNumber = value;
    }
  };

  setRowsPerPage(rowsPerPage: number) {
    this.state.rowsPerPage = rowsPerPage
  }

  sortRows({ by, asc = false }: { by: keyof T, asc: boolean }) {
    this.sort = { by, asc }
    if (asc) {
      this.rows = this.rows.sort((a, b) => a[by] > b[by] ? 1 : -1)
    } else {
      this.rows = this.rows.sort((a, b) => a[by] < b[by] ? 1 : -1)
    }
  }
}
