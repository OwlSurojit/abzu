
const helpers = {}

helpers.mapQuayToVariables = quay => {

  let newQuay = {
    id: quay.id,
    geometry: null,
    compassBearing: quay.compassBearing,
    publicCode: quay.publicCode,
    description: {
      value: quay.description,
      lang: 'no'
    }
  }

  if (quay.location) {
    newQuay.geometry = {
      coordinates: [
        [ quay.location[1], quay.location[0] ]
      ],
        type: "Point"
    }
  }

  return newQuay
}

helpers.mapStopToVariables = stop => {

  let newStop =  {
    id: stop.id,
    name: stop.name,
    description: stop.description || null,
    stopPlaceType: stop.stopPlaceType,
    quays: stop.quays.map(quay => helpers.mapQuayToVariables(quay))
  }

  if (stop.location) {
    newStop.coordinates = [
      [ stop.location[1], stop.location[0] ]
    ]
  }

  return newStop
}

helpers.mapPathLinkToVariables = pathLink => {

  return pathLink
    .map( source => {

      let pathLink = JSON.parse(JSON.stringify(source))

      if (pathLink.from && pathLink.from.quay) {
        delete pathLink.from.quay.geometry
      }

      pathLink.transferDuration = {
        defaultDuration: source.estimate
      }

      if (pathLink.inBetween && pathLink.inBetween.length) {
        pathLink.geometry = {
          type: "LineString",
          coordinates: pathLink.inBetween.map( latlng => latlng.reverse())
        }
      }


      if (pathLink.to && pathLink.to.quay) {
        delete pathLink.to.quay.geometry
      }

      delete pathLink.estimate
      delete pathLink.duration
      delete pathLink.inBetween

      return pathLink
    })

}


export default helpers