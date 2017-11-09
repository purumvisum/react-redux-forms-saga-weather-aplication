export default function images(state = {}, action) {
    switch (action.type) {
    case 'SET_IMAGE_FORECAST':
        return action.imagesMap;
    default:
        return state;
    }
}
