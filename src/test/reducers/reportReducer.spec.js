import { reduceTopopGraphicalPlacesForReport, reduceSearchResultsForReport, populateStopPlacesWithParking, reportReducer, initialState} from '../../reducers/reportReducer';

import {
    APOLLO_MUTATION_ERROR,
    APOLLO_QUERY_RESULT
}  from '../../actions/Types';

describe('reportReducer', () => {
    it('should return the function reduceTopopGraphicalPlacesForReport(state, action) when action name is TopopGraphicalPlacesForReport', () => {
        const action = {
            type: APOLLO_QUERY_RESULT,
            operationName: "TopopGraphicalPlacesForReport",
            result: {data: {topographicPlace: [] } }
        };
        const state = initialState;

        expect(reportReducer(state, action)).toEqual(reduceTopopGraphicalPlacesForReport(state, action));
    });

    it('should return the function reduceSearchResultsForReport(state, action) when action name is findStopForReport', () => {
        const action = {
            type: APOLLO_QUERY_RESULT,
            operationName : "findStopForReport",
            result: {data : {stopPlace: []}},
        }
        const state = initialState;

        expect(reportReducer(state, action)).toEqual(reduceSearchResultsForReport(state, action));
    });

    it('should return the function populateStopPlacesWithParking(state, action.result.data) when action name is ParkingForMultipleStopPlaces', () => {
        const action = {
            type: APOLLO_QUERY_RESULT,
            operationName : "ParkingForMultipleStopPlaces",
            result: {data : []},
        }
        const state = initialState;

        expect(reportReducer(state, action)).toEqual(populateStopPlacesWithParking(state, action.result.data));
    });

    it('should return the state when action type is APOLLO_QUERY_RESULT and the name is none of the specified', () => {
        const action = {
            type: APOLLO_MUTATION_ERROR,
            operationName : "",
            
        }
        const state = initialState;

        expect(reportReducer(state, action)).toEqual(state);
    });

    it('should return the state when action type is not APOLLO_QUERY_RESULT', () => {
        const action = {
            type: APOLLO_QUERY_RESULT,
            operationName : "",
        }
        const state = initialState;

        expect(reportReducer(state, action)).toEqual(state);
    });


});