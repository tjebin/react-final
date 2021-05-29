const initialState = {
    topics: []
}

const topicReducer = (state=initialState, action) => {
    switch (action.type) {
        case "CREATE_TOPIC":
            return {
                ...state,
                topics: [
                    ...state.topics,
                    action.topic
                ]
            }
        case "FIND_TOPICS":
            return {
                ...state,
                topics: action.topics
            }

        case "DELETE_TOPIC":
                    const newState1 = {
                        topics: state.topics.filter(topic => {
                            if(topic._id === action.topicToDelete._id) {
                                return false
                            } else {
                                return true
                            }
                        })
                    }
                    return newState1
        case "UPDATE_TOPIC":
                    return {
                        topics: state.topics.map(m => {
                            if(m._id === action.topic._id) {
                                return action.topic
                            } else {
                                return m
                            }
                        })
                   }
        case "RESET_TOPIC":
                    const newState2 = {
                        ...state,
                        topics: []
                    }
                    return newState2

        default:
            return state
    }
}

export default topicReducer