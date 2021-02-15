import * as React from 'react';
import { shallow } from 'enzyme';
import { Places } from '../components/Places';
import PlacesRenderer from '../components/PlacesRenderer';
import Alert from '@material-ui/lab/Alert';
import axios from 'axios';

jest.mock('axios');

describe('Places', () => {
    let wrapper;
    let instance;

    beforeEach(() => {
        wrapper = shallow(<Places/>);
        instance = wrapper.instance();
    })

    it('renders places', () => {
        expect(wrapper.find(PlacesRenderer)).toHaveLength(1);
    });

    describe('when component mounts', () => {
        beforeEach(() => {
            jest.spyOn(instance, 'getPlaces');
            instance.componentDidMount();
        });

        it('calls getPlaces', () => {
            expect(instance.getPlaces).toHaveBeenCalledTimes(1);
        });
    });

    describe('when getPlaces is success', () => {
        let places = [{id:"123"}]
        const res = {data: {data: places}};

        beforeEach(async () => {
            axios.get.mockImplementationOnce(() => Promise.resolve(res));
            await instance.getPlaces();
        });

        it('isLoading is set to false', () => {
            expect(wrapper.state('isLoading')).toEqual(false);
        })

        it('places data is saved to state', () => {
            expect(wrapper.state('places')).toEqual(places);
        })
    })

    describe('when getPlaces is failed', () => {
        beforeEach(async () => {
            axios.get.mockImplementationOnce(() => Promise.reject());
            await instance.getPlaces();
        });

        it('isLoading is set to false', () => {
            expect(wrapper.state('isLoading')).toEqual(false);
        })

        it('places data is saved to state', () => {
            expect(wrapper.state('isError')).toEqual(true);
        })

        it('failure banner is displayed', () => {
            expect(wrapper.find(Alert)).toHaveLength(1);
        })
    })
})