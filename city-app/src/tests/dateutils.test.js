import * as React from 'react';
import { OpenStatus, isOpeningHour } from '../helper/DateUtils';

describe('DateUtils', () => {
    let weekdayId = (new Date()).getDay()

    describe('opening hours is missing', () => {
        let openingHours = [{weekday_id: weekdayId+1}]
    
        it('opening status is unknown', () => {
            expect(isOpeningHour(openingHours, weekdayId)).toEqual(OpenStatus.unknown);
        })
    })

    describe('current time is between opening hours', () => {
        let hours = (new Date()).getHours()
        let openingHours = [{weekday_id: weekdayId, opens:hours-1 + ":00:00", closes: hours+1 + ":00:00", open24h: false}]

        it('opening status is open', () => {
            expect(isOpeningHour(openingHours, weekdayId)).toEqual(OpenStatus.open);
        })
    })

    describe('current time is not between opening hours', () => {
        let hours = (new Date()).getHours()
        let openingHours = [{weekday_id: weekdayId, opens:hours+1 + ":00:00", closes: hours+2 + ":00:00", open24h: false}]

        it('opening status is closed', () => {
            expect(isOpeningHour(openingHours, weekdayId)).toEqual(OpenStatus.closed);
        })
    })
})