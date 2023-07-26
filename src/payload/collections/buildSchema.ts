import paginate from 'mongoose-paginate-v2';
import { Schema } from 'mongoose';
import { SanitizedConfig } from '../config/types';
import buildQueryPlugin from '../mongoose/buildQuery';
import buildSchema from '../mongoose/buildSchema';
import { SanitizedCollectionConfig } from './config/types';

const buildCollectionSchema = (collection: SanitizedCollectionConfig, config: SanitizedConfig, schemaOptions = {}): Schema => {
  const schema = buildSchema(
    config,
    collection.fields,
    {
      draftsEnabled: Boolean(typeof collection?.versions === 'object' && collection.versions.drafts),
      options: { timestamps: collection.timestamps !== false, ...schemaOptions },
      indexSortableFields: config.indexSortableFields,
    },
  );

  if (config.indexSortableFields && collection.timestamps !== false) {
    schema.index({ updatedAt: 1 });
    schema.index({ createdAt: 1 });
  }

  schema.plugin(paginate, { useEstimatedCount: true })
    .plugin(buildQueryPlugin);

  return schema;
};

export default buildCollectionSchema;
