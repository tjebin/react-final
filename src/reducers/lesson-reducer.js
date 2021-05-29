const initialState = {
    lessons: []
}

const lessonReducer = (state = initialState, action) => {
    switch (action.type) {
        case "CREATE_LESSON":
            return {
                ...state,
                lessons: [
                    ...state.lessons,
                    action.lesson
                ]
            }
        case "FIND_LESSONS":
            return {
                ...state,
                lessons: action.lessons
            }

        case "DELETE_LESSON":
            alert("  delete in reducer....");
            const newState1 = {
                lessons: state.lessons.filter(lesson => {
                    if (lesson._id === action.lessonToDelete._id) {
                        return false
                    } else {
                        return true
                    }
                })
            }
            return newState1
        case "UPDATE_LESSON":
            return {
                lessons: state.lessons.map(m => {
                    if (m._id === action.lesson._id) {
                        return action.lesson
                    } else {
                        return m
                    }
                })
            }

        case "RESET_LESSON":
            const newState2 = {
                ...state,
                lessons: []
            }
            return newState2
        default:
            return state
    }
}

export default lessonReducer