export function getLocation(location) {
  const formattedAmsl = Number(location.amsl) / 10
  const locationZoom = formattedAmsl > 12 || formattedAmsl < 7 ? 12 : formattedAmsl
  const locationCenter = { lat: Number(location.lat), lng: Number(location.lon) }

  return({ locationZoom, locationCenter })
}
