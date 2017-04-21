import gql from 'graphql-tag'

const Fragments = {}

Fragments.quay = {
  verbose: gql`
      fragment VerboseQuay on Quay {
          id
          geometry {
              coordinates
          }
          version
          compassBearing
          publicCode
          description {
              value
          }
          importedId
          accessibilityAssessment {
              limitations {
                  wheelchairAccess
                  stepFreeAccess
                  escalatorFreeAccess
                  liftFreeAccess
                  audibleSignalsAvailable
              }
          }
          placeEquipments {
              waitingRoomEquipment {
                  seats
                  heated
                  stepFree
              }
              sanitaryEquipment {
                  numberOfToilets
                  gender
              }
              ticketingEquipment {
                  ticketOffice
                  ticketMachines
                  numberOfMachines
              }
              cycleStorageEquipment {
                  numberOfSpaces
                  cycleStorageType
              }
              shelterEquipment {
                  seats
                  stepFree
                  enclosed
              }
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
        geometry {
            coordinates
        }
        quays {
            ...VerboseQuay
        }
        version
        importedId
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
        accessibilityAssessment {
            limitations {
                wheelchairAccess
                stepFreeAccess
                escalatorFreeAccess
                liftFreeAccess
                audibleSignalsAvailable
            }
        }
        placeEquipments {
            waitingRoomEquipment {
                seats
                heated
                stepFree
            }
            sanitaryEquipment {
                numberOfToilets
                gender
            }
            ticketingEquipment {
                ticketOffice
                ticketMachines
                numberOfMachines
            }
            cycleStorageEquipment {
                numberOfSpaces
                cycleStorageType
            }
            shelterEquipment {
                seats
                stepFree
            }
        }
    }
    ${Fragments.quay.verbose}
  `
}

Fragments.pathLink = {
  verbose: gql `
      fragment VerbosePathLink on PathLink {
          id
          transferDuration {
              defaultDuration
          }
          geometry {
              type
              coordinates
          }
          from {
              placeRef {    
                  version
                  ref
                  addressablePlace {
                      id
                      geometry {
                          coordinates
                          type
                      }
                  }
              }
          }
          to {
              placeRef {
                  version
                  ref
                  addressablePlace {
                      id
                      geometry {
                          coordinates
                          type
                      }
                  }
              }
          }
      }
  `
}


export default Fragments