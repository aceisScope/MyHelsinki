import * as React from 'react';
import { shallow } from 'enzyme';
import { PlacesRenderer } from '../components/PlacesRenderer';
import Button from '@material-ui/core/Button';
import { jssPreset } from '@material-ui/core';

describe('PlacesRenderer', () => {
    let wrapper;
    const defaultURL = "https://cdn.pixabay.com/photo/2019/05/08/22/01/helsinki-cathedral-4189824__340.jpg";
    const imageURL = "https://edit.myhelsinki.fi/sites/default/files/styles/api_1980x1020/public/2017-10/12645064_458627557665379_3453464369390787997_n.jpg?h=dec22bcf&itok=_uZQok6l";

    const props = {
        classes: {},
        places: [
            {
                id:"123", 
                name:"test place", 
                location: {
                    address: {}
                }, 
                description:{}
            },
            {
                id:"456", 
                name:"test place", 
                location: {
                    address: {}
                }, 
                description:{images: [{url: imageURL}]}
            }],
        isLoading: false,
        loadedAll: false,
        loadMore: () => {}
    }

    beforeAll(() => {
        wrapper = shallow(<PlacesRenderer {...props}/>);
    })

    describe('when image url is missing', () => {
        it('getImage returns default image url', () => {
            expect(wrapper.findWhere(node => node.key() === '123').find("img").prop("src")).toEqual(defaultURL);
        });
    })

    describe('when image url is present', () => {
        it('getImage returns default image url', () => {
            expect(wrapper.findWhere(node => node.key() === '456').find("img").prop("src")).toEqual(imageURL);
        });
    })

    describe('when load more button is clicked', () => {
        it('click event from props should be triggered', () => {
            const clickMock = jest.fn();
            wrapper.setProps({ loadMore: clickMock });
            wrapper.find(Button).simulate('click');
            expect(clickMock).toHaveBeenCalledTimes(1);
        });
      });
})