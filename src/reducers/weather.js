function weather(state = {}, action) {
    switch(action.type) {
        case 'WEATHER_FETCHED':
            return action.normalizedResults;
        default:
            return state;
    }
}

export default weather;