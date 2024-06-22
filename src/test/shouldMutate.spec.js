import {shouldMutateParking} from '../modelUtils/shouldMutate';


describe('shouldMutateParking', () => {
    it('should return false if parking is an empty list', () => {
        const parking = [];

        expect(shouldMutateParking(parking)).toEqual(false);
    });

    it('should return false when parking is null', () => {
        const parking = null;

        expect(shouldMutateParking(parking)).toEqual(false);
    });

    it('should return true when parking is a list and not empty', () => {
        const parking = [1];

        expect(shouldMutateParking(parking)).toEqual(true);
    });



});
