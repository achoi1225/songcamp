export const HIDE_LOGIN_FORM = "songcamp/ui-login/HIDE_FORM";
export const SHOW_LOGIN_FORM = "songcamp/ui-login/SHOW_FORM";

export const hideLoginForm = () => ({
    type: HIDE_LOGIN_FORM
})

export const showLoginForm = () => ({
    type: SHOW_LOGIN_FORM
})

export function loginFormReducer(state = { formVisible: false }, action) {
    switch(action.type) {
        case HIDE_LOGIN_FORM: {
            return {
                ...state,
                formVisible: false,
            };
        }

        case SHOW_LOGIN_FORM: {
            return {
                ...state,
                formVisible: true,
            };
        }

        default:
            return state;
    }
}

export default loginFormReducer;