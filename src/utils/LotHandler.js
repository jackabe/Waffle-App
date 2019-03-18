function getLotDetails(data) {
    let details = data[0];
    return {
        name: details['name'],
        capacity: details['capacity'],
        lat: details['latitude'],
        long: details['longitude'],
        lot_id: details['id'],
        favourite: false
    };
}

function getLotPrices(data) {
    let prices = data[1];
    return prices;
}

function getLotSpaces(data, details) {
    let capacity = details['capacity'];
    let bays = data[2];
    let i = 0;
    for (i; i < bays.length; i++) {
        let booking = bays[i][1];
        if (booking.length === 0) {
            // no bookings
        }
        else {
            let arrival = booking['arrival'];
            let departure = booking['departure'];
            let difference = getDifferenceToNow(arrival, departure);
            if (difference === 0) {
                capacity -= 1;
            }
        }
    }
    return capacity;
}

function getDifferenceToNow(arrivalBookingDate, departureBookingDate) {
    arrivalBookingDate = new Date(arrivalBookingDate*1000);
    departureBookingDate = new Date(departureBookingDate*1000);
    let today = (new Date());
    let day = today.getDate();
    let month = today.getMonth();
    let year = today.getFullYear();

    let yearDifference = year - arrivalBookingDate.getFullYear();
    let monthDifference = month - arrivalBookingDate.getMonth();
    let dayDifference = day - arrivalBookingDate.getDate();

    if (yearDifference === 0 && monthDifference === 0 && dayDifference === 0) {
        // Bookings are today
        let hour = today.getHours();
        if (arrivalBookingDate.getHours() - hour === 0) {
            return 0;
        }
        else if (departureBookingDate.getHours() - hour > 0  && departureBookingDate.getHours() - hour < 2) {
            return 0;
        }
        else {
            return 1;
        }
    }
    else {
        return 1;
    }

}

module.exports = {
    getLotDetails,
    getLotPrices,
    getLotSpaces
};