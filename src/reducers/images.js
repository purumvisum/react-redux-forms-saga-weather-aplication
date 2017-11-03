export default function images(state = {}, action) {
    switch(action.type) {
        case 'SET_IMAGE_FORECAST':
            return action.imagesMap;
        // case 'SET_IMAGE_LOCATION':
        //     return action.locationImage;
        default:
            return state;
    }
}
