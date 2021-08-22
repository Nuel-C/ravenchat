var show = {
    value: false,
    reportUsername:''
}

const showForm = (state = show, action) => {
    switch(action.type){
        case 'SHOW_FORM':
            return action.data
        default:
            return state
    }
}

export default showForm