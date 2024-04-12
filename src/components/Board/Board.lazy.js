import React, { lazy, Suspense } from 'react';

const LazyBoard = lazy(() => import('./Board'));

const Board = props => (
  <Suspense fallback={null}>
    <LazyBoard {...props} />
  </Suspense>
);

export default Board;
