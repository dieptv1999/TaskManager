import {
    UNLOADING,
    LOADING
} from './actions/common/action_types'

export default (
    state = {
        loading: false,
        listAddress: []
    },
    action
) => {
    switch (action.type) {
        case LOADING:
            return {
                loading: true
            }
        case UNLOADING:
            return {
                loading: false
            }
        default:
            return {
                ...state
            }
    }
}
