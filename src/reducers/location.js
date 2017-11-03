export default function location(state = {}, action) {
    switch(action.type) {
        case 'LOCATION_CHANGED':
        case 'DEFAULT_LOCATION':
            return action.location;
        default:
            return state;
    }
}
