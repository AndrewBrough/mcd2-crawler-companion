import { useEffect, useState } from 'react'

const SEARCH_SETTINGS_KEY = 'search-settings'

type SearchSettings = {
  groupBySet: boolean
}

const defaultSettings: SearchSettings = {
  groupBySet: true,
}

function readSearchSettings(): SearchSettings {
  if (typeof localStorage === 'undefined') {
    return defaultSettings
  }

  try {
    const raw = localStorage.getItem(SEARCH_SETTINGS_KEY)
    const parsed = raw ? (JSON.parse(raw) as Partial<SearchSettings>) : {}
    return {
      groupBySet: typeof parsed.groupBySet === 'boolean' ? parsed.groupBySet : true,
    }
  } catch {
    return defaultSettings
  }
}

function writeSearchSettings(settings: SearchSettings) {
  localStorage.setItem(SEARCH_SETTINGS_KEY, JSON.stringify({ groupBySet: settings.groupBySet }))
}

export function useSearchSettings() {
  const [groupBySet, setGroupBySetState] = useState(defaultSettings.groupBySet)

  useEffect(() => {
    setGroupBySetState(readSearchSettings().groupBySet)
  }, [])

  function setGroupBySet(value: boolean) {
    setGroupBySetState(value)
    writeSearchSettings({ groupBySet: value })
  }

  return { groupBySet, setGroupBySet }
}
