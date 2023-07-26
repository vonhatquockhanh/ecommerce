import editorAPI from './editor.route';

export const initRouteAPIV1 = app => {
  app.use('/api/v1', editorAPI);

  return app;
};
