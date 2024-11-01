// export type TableStoreFilters<T> = Record<keyof T, {
//   filter: "select",
//   values: T[keyof T][]
//   range: T[keyof T][]
// } | {
//   filter: "date-range",
//   values: [Date, Date],
//   strValues: [string, string],
//   range: [Date, Date],
// } | {
//   filter: "number-range",
//   values: [number, number],
//   range: [number, number]
// }>

type Literal<A, B extends A> = B
export type FilterTypes = "date-range" | "number-range" | "select"

export type FilterDateRange = {
  filter: Literal<FilterTypes, "date-range">,
  values: [Date, Date],
  strValues: [string, string],
  range: [Date, Date],
}

export type FilterNumberRange = {
  filter: Literal<FilterTypes, "number-range">,
  values: [number, number],
  range: [number, number],
}

export type FilterSelectRange = {
  filter: Literal<FilterTypes, "select">
  values: string[],
  range: string[],
}

export type TableStoreFilters<T> = Record<keyof T, FilterDateRange | FilterNumberRange | FilterSelectRange>

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

  rows = $state<T[]>([])
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
        if (this.filters[key].filter === "select" && !this.filters[key].values.includes(String(row[key]))) {
          return false
        } else if (this.filters[key].filter === "number-range" && typeof row[key] === "number") {
          if (row[key] < this.filters[key].values[0] || row[key] > this.filters[key].values[1]) {
            return false
          }
        } else if (this.filters[key].filter === "date-range" && row[key] instanceof Date) {
          let seconds = row[key].getTime()
          if (seconds < this.filters[key].values[0].getTime() || seconds > this.filters[key].values[1].getTime()) {
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
    return res
  })
  count = $derived(this.visibleRows.length)
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
    rows,
    filters,
    state = null,
    sort = null }: {
      rows: T[],
      filters: TableStoreFilters<T>,
      state?: TableStoreState<T> | null,
      sort?: TableStoreSort<T>
    }) {
    this.rows = rows
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

  getPageRows() {
    return this.visibleRows.slice(
      this.state.pageNumber * this.state.rowsPerPage,
      (this.state.pageNumber + 1) * this.state.rowsPerPage
    )
  }

  addSelectFilter({ col, value }: { col: keyof T, value: string }) {
    if (this.filters[col].filter !== "select") return
    this.filters[col].values.push(value)
  }

  removeSelectFilter({ col, value }: { col: keyof T, value: T[keyof T] }) {
    if (this.filters[col].filter !== "select") return
    this.filters[col].values.filter((filterValue) => filterValue !== value)
  }

  setRangeFilter({ col, value, valueIdx }: { col: keyof T, value: Date | number, valueIdx: 0 | 1 }) {
    if (this.filters[col].filter !== "date-range" && this.filters[col].filter !== "number-range") return
    this.filters[col].values[valueIdx] = value
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
      this.filters[key].values[0] = this.filters[key].range[0]
      this.filters[key].values[1] = this.filters[key].range[1]
    }
    if ("strValues" in this.filters[key]) {
      this.filters[key].strValues = [this.filters[key].values[0].toISOString().slice(0, 10), this.filters[key].values[1].toISOString().slice(0, 10)]
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
