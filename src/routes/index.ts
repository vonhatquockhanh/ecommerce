import editorAPI from './editor.route';
import cateAPI from './category.route';
import productionAPI from './product.route';
import productionV2API from './product.routeV2';
import order from './order.route';

export const initRouteAPIV1 = app => {
  app.use('/api/v1', editorAPI);
  app.use('/api/v1', cateAPI);
  app.use('/api/v1', productionAPI);
  app.use('/api/v2', productionV2API);
  app.use('/api/v1', order);
  return app;
};
