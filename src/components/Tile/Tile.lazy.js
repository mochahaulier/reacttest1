import React, { lazy, Suspense } from 'react';

const LazyTile = lazy(() => import('./Tile'));

const Tile = props => (
  <Suspense fallback={null}>
    <LazyTile {...props} />
  </Suspense>
);

export default Tile;
