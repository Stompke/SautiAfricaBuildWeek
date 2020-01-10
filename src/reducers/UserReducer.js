export const UserReducer = (state, action) => {
    console.log("CCCC" + action.userId);
    switch (action.type) {
        case 'USER':
            return Object.assign({}, state, {
                userId: action.userId
            });
        default:
            return {userId: ''}   ;
    }
}