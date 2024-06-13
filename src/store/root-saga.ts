import { call, all } from 'typed-redux-saga';
import { userSagas } from './user/user.thunk';
import { recipeSaga } from './recipe/recipe.saga';

export function* rootSaga() {
    //TODO: add user saga and recipe saga here
    yield* all([call(userSagas), call(recipeSaga)]);
}
