import { useNavigate } from '@tanstack/react-router'
import { savedBuildLabel, type SavedBuild } from '#/lib/build/build-storage'
import { BuildSavedItem } from './BuildSavedItem'
import styles from './BuildSavedMenu.module.css'

export type BuildSavedMenuProps = {
  builds: Array<SavedBuild>
  query: string
  onDelete: (key: string) => void
}

export function BuildSavedMenu({ builds, query, onDelete }: BuildSavedMenuProps) {
  const navigate = useNavigate()
  const needle = query.trim().toLowerCase()
  const visible = needle
    ? builds.filter((build) => savedBuildLabel(build.key).toLowerCase().includes(needle))
    : builds

  function selectBuild(url: string) {
    const parsed = new URL(url, window.location.origin)
    const search: Record<string, string> = {}
    parsed.searchParams.forEach((value, key) => {
      search[key] = value
    })
    void navigate({ to: '/', search } as Parameters<typeof navigate>[0])
  }

  function startNewBuild() {
    void navigate({ to: '/', search: {} } as Parameters<typeof navigate>[0])
  }

  return (
    <ul
      className={styles.list}
      id="saved-builds"
      role="menu"
      onMouseDown={(event) => event.preventDefault()}
    >
      <li className={visible.length > 0 ? styles.newBuildRow : undefined}>
        <button className={styles.newBuild} type="button" role="menuitem" onClick={startNewBuild}>
          New build
        </button>
      </li>
      {visible.map((build) => (
        <BuildSavedItem key={build.key} build={build} onSelect={selectBuild} onDelete={onDelete} />
      ))}
    </ul>
  )
}
