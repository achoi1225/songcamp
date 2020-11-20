export const HIDE_FAN_SIGNUP_FORM = "songcamp/ui-fan-signup/HIDE_FORM";
export const SHOW_FAN_SIGNUP_FORM = "songcamp/ui-fan-signup/SHOW_FORM";

export const hideFanSignupForm = () => ({
    type: HIDE_FAN_SIGNUP_FORM
})

export const showFanSignupForm = () => ({
    type: SHOW_FAN_SIGNUP_FORM
})

export function fanSignupFormReducer(state = { formVisible: false }, action) {
    switch(action.type) {
        case HIDE_FAN_SIGNUP_FORM: {
            return {
                ...state,
                formVisible: false,
            };
        }

        case SHOW_FAN_SIGNUP_FORM: {
            return {
                ...state,
                formVisible: true,
            };
        }

        default:
            return state;
    }
}

export default fanSignupFormReducer;