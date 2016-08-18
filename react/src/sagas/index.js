import createSagaMiddleware from 'redux-saga';

import { root } from 'sagas/counter';

const sagaMiddleware = createSagaMiddleware(root);

export default sagaMiddleware;
