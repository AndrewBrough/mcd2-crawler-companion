import type { ErrorComponentProps } from '@tanstack/react-router'
import { RouteError } from '#/components/RouteError'

export type CatalogRouteErrorProps = ErrorComponentProps

export function CatalogRouteError({ error }: CatalogRouteErrorProps) {
  return (
    <RouteError
      title="Could not load catalog"
      body={error.message || 'The catalog request failed.'}
    />
  )
}
