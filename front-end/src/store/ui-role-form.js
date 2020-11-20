export const HIDE_ROLE_FORM = "songcamp/ui-role/HIDE_FORM";
export const SHOW_ROLE_FORM = "songcamp/ui-role/SHOW_FORM";

export const hideRoleForm = () => ({
    type: HIDE_ROLE_FORM
})

export const showRoleForm = () => ({
    type: SHOW_ROLE_FORM
})

export function roleFormReducer(state = { formVisible: false }, action) {
    switch(action.type) {
        case HIDE_ROLE_FORM: {
            return {
                ...state,
                formVisible: false,
            };
        }

        case SHOW_ROLE_FORM: {
            return {
                ...state,
                formVisible: true,
            };
        }

        default:
            return state;
    }
}

export default roleFormReducer;