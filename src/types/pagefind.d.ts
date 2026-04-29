declare module '@pagefind/default-ui' {
  export class PagefindUI {
    constructor(options: {
      element: string
      showImages?: boolean
      showEmptyFilters?: boolean
      translations?: Record<string, string>
    })
  }
}