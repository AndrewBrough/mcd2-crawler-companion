export class CatalogQueryError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'CatalogQueryError'
  }
}
