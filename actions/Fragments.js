import gql from 'graphql-tag'

const Fragments = {}

Fragments.quay = {
  verbose: gql`
      fragment VerboseQuay on Quay {
          id
          location {
              latitude
              longitude
          }
          compassBearing
          publicCode
          description {
              value
          }
      }
  `
}

Fragments.stopPlace = {
  verbose: gql `
    fragment VerboseStopPlace on StopPlace {
        id
        name {
            value
        }
        description {
            value
        }
        location {
            latitude
            longitude
        }
        quays {
            ...VerboseQuay
        }
        stopPlaceType
        topographicPlace {
            name {
                value
            }
            parentTopographicPlace {
                name {
                    value
                }
            }
            topographicPlaceType
        }
        
    }
    ${Fragments.quay.verbose}
  `
}




export default Fragments