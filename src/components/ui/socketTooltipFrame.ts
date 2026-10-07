export type SocketTooltipFrame = {
  top: number
  left: number
  width: number
  paddingLeft: number
  paddingRight: number
  gap: number
  badge: number
}

const TOOLTIP_BORDER = 1

export function readSocketTooltipFrame(host: HTMLElement): SocketTooltipFrame {
  const anchor = host.closest('section') ?? host
  const bounds = anchor.getBoundingClientRect()
  const hostRect = host.getBoundingClientRect()
  const media = host.querySelector('img')?.parentElement
  const copy = media?.nextElementSibling
  const frame: SocketTooltipFrame = {
    top: hostRect.bottom,
    left: bounds.left,
    width: bounds.width,
    paddingLeft: 0,
    paddingRight: 0,
    gap: 0,
    badge: 0,
  }

  if (!media || !copy) {
    return frame
  }

  const mediaRect = media.getBoundingClientRect()
  const copyRect = copy.getBoundingClientRect()
  return {
    ...frame,
    paddingLeft: Math.max(0, mediaRect.left - bounds.left - TOOLTIP_BORDER),
    paddingRight: Math.max(0, bounds.right - copyRect.right - TOOLTIP_BORDER),
    gap: Math.max(0, copyRect.left - mediaRect.right),
    badge: mediaRect.width,
  }
}
