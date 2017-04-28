import { store } from '../store';

export const dispatch = (action, component) => {
    const result = store.dispatch(action);
    component.setState(store.getState());

    return result.payload || result;
};