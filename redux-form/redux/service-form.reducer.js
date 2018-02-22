const serviceForm = (state = {}, action) => {
    switch (action.type) {
        case 'FORM_CHANGE':
            let formData = action.formChange.formData;
            debugger;
            return {
                ...formData
            }
        case 'DELETE_RECORD':
            const stateCopy = Object.assign({}, state);
            delete stateCopy.company;
            delete stateCopy.contact;
            delete stateCopy.type;
            return stateCopy;

        default:
            return state
    }
}

export default serviceForm;