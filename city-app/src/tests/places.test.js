import * as React from 'react';
import { shallow } from 'enzyme';
import { Places } from '../components/Places';
import ListSubheader from '@material-ui/core/ListSubheader';
import axios from 'axios';

jest.mock('axios');

describe('Places', () => {
    let wrapper;
    let instance;

    const getDefaultProps = () => ({
        classes: {},
    });

    beforeEach(() => {
        wrapper = shallow(<Places {...getDefaultProps()}/>);
        instance = wrapper.instance();
    })

    it('renders title', () => {
        expect(wrapper.find(ListSubheader).text()).toEqual('Places');
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

    describe('when image url is missing', () => {
        let imageWrapper;
        const defaultURL = "https://cdn.pixabay.com/photo/2019/05/08/22/01/helsinki-cathedral-4189824__340.jpg";

        beforeEach(() => {
            imageWrapper = shallow(instance.getImage(""));
        });

        it('getImage returns default image url', () => {
            expect(imageWrapper.find("img").prop("src")).toEqual(defaultURL);
        });
    })

    describe('when image url is presenting', () => {
        let imageWrapper;
        const imageURL = "https://edit.myhelsinki.fi/sites/default/files/styles/api_1980x1020/public/2017-10/12645064_458627557665379_3453464369390787997_n.jpg?h=dec22bcf&itok=_uZQok6l";
        const description = {images: [{url: imageURL}]}

        beforeEach(() => {
            imageWrapper = shallow(instance.getImage(description));
        });

        it('getImage returns default image url', () => {
            expect(imageWrapper.find("img").prop("src")).toEqual(imageURL);
        });
    })

    describe('when getPlaces is called', () => {
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
})