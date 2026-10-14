import { useEffect, useState } from 'react'

const SEARCH_SETTINGS_KEY = 'search-settings'

type SearchSettings = {
  groupBySet: boolean
  showEnchantmentsAndEffects: boolean
}

const defaultSettings: SearchSettings = {
  groupBySet: true,
  showEnchantmentsAndEffects: true,
}

function readSearchSettings(): SearchSettings {
  if (typeof localStorage === 'undefined') {
    return defaultSettings
  }

  try {
    const raw = localStorage.getItem(SEARCH_SETTINGS_KEY)
    const parsed = raw ? (JSON.parse(raw) as Partial<SearchSettings>) : {}
    return {
      groupBySet: typeof parsed.groupBySet === 'boolean' ? parsed.groupBySet : defaultSettings.groupBySet,
      showEnchantmentsAndEffects:
        typeof parsed.showEnchantmentsAndEffects === 'boolean'
          ? parsed.showEnchantmentsAndEffects
          : defaultSettings.showEnchantmentsAndEffects,
    }
  } catch {
    return defaultSettings
  }
}

function writeSearchSettings(settings: SearchSettings) {
  localStorage.setItem(SEARCH_SETTINGS_KEY, JSON.stringify(settings))
}

export function useSearchSettings() {
  const [settings, setSettings] = useState(defaultSettings)

  useEffect(() => {
    setSettings(readSearchSettings())
  }, [])

  function update(patch: Partial<SearchSettings>) {
    setSettings((current) => {
      const next = { ...current, ...patch }
      writeSearchSettings(next)
      return next
    })
  }

  return {
    groupBySet: settings.groupBySet,
    setGroupBySet: (groupBySet: boolean) => update({ groupBySet }),
    showEnchantmentsAndEffects: settings.showEnchantmentsAndEffects,
    setShowEnchantmentsAndEffects: (showEnchantmentsAndEffects: boolean) =>
      update({ showEnchantmentsAndEffects }),
  }
}
