export const OpenStatus = Object.freeze({open: "OPEN", closed: "CLOSED", unknown: "UNKNOWN"})

export function isOpeningHour(openingHours, weekdayId) {
    if (!openingHours) {
        return OpenStatus.unknown
    }
    
    if (weekdayId === 0) {
        weekdayId = 7 // sunday is 0
    }
    const openingHour = openingHours.find(hour => hour.weekday_id === weekdayId)
    if (!openingHour) {
        return OpenStatus.unknown
    }
    
    let opens = openingHour.opens
    let closes = openingHour.closes
    if (opens && closes) {
        let opensHour = new Date()
        opensHour.setHours(opens.substring(0, 2), opens.substring(3, 5), 0)
        let closesHour = new Date()
        closesHour.setHours(closes.substring(0, 2), closes.substring(3, 5), 0)
        
        let current = new Date()
        current.setSeconds(0)
        if (current > opensHour && current < closesHour) {
            return OpenStatus.open
        } else {
            return OpenStatus.closed
        }
    }  else {
        return OpenStatus.unknown
    }
}