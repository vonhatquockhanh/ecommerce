import editorAPI from './editor.route';
import cateAPI from './category.route';
import productionAPI from './product.route';

export const initRouteAPIV1 = app => {
  app.use('/api/v1', editorAPI);
  app.use('/api/v1', cateAPI);
  app.use('/api/v1', productionAPI);
  return app;
};
