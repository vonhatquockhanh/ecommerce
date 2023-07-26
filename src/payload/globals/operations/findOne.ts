import { hasWhereAccessResult } from '../../auth';
import executeAccess from '../../auth/executeAccess';
import { Where } from '../../types';
import { AccessResult } from '../../config/types';
import sanitizeInternalFields from '../../utilities/sanitizeInternalFields';
import replaceWithDraftIfAvailable from '../../versions/drafts/replaceWithDraftIfAvailable';
import { afterRead } from '../../fields/hooks/afterRead';
import { SanitizedGlobalConfig } from '../config/types';
import { PayloadRequest } from '../../express/types';

type Args = {
  globalConfig: SanitizedGlobalConfig
  locale?: string
  req: PayloadRequest
  slug: string
  depth?: number
  showHiddenFields?: boolean
  draft?: boolean
  overrideAccess?: boolean
}

async function findOne<T extends Record<string, unknown>>(args: Args): Promise<T> {
  const {
    globalConfig,
    locale,
    req,
    req: {
      payload,
    },
    slug,
    depth,
    showHiddenFields,
    draft: draftEnabled = false,
    overrideAccess = false,
  } = args;

  const { globals: { Model } } = payload;

  // /////////////////////////////////////
  // Retrieve and execute access
  // /////////////////////////////////////

  const queryToBuild: { where?: Where } = {
    where: {
      and: [
        {
          globalType: {
            equals: slug,
          },
        },
      ],
    },
  };

  let accessResult: AccessResult;

  if (!overrideAccess) {
    accessResult = await executeAccess({ req }, globalConfig.access.read);

    if (hasWhereAccessResult(accessResult)) {
      queryToBuild.where.and.push(accessResult);
    }
  }

  const query = await Model.buildQuery(queryToBuild, locale);

  // /////////////////////////////////////
  // Perform database operation
  // /////////////////////////////////////

  let doc = await Model.findOne(query).lean() as any;

  if (!doc) {
    doc = {};
  } else if (doc._id) {
    doc.id = doc._id;
    delete doc._id;
  }

  doc = JSON.stringify(doc);
  doc = JSON.parse(doc);
  doc = sanitizeInternalFields(doc);

  // /////////////////////////////////////
  // Replace document with draft if available
  // /////////////////////////////////////

  if (globalConfig.versions?.drafts && draftEnabled) {
    doc = await replaceWithDraftIfAvailable({
      payload,
      entity: globalConfig,
      entityType: 'global',
      doc,
      locale,
      accessResult,
    });
  }

  // /////////////////////////////////////
  // Execute before global hook
  // /////////////////////////////////////

  await globalConfig.hooks.beforeRead.reduce(async (priorHook, hook) => {
    await priorHook;

    doc = await hook({
      req,
      doc,
    }) || doc;
  }, Promise.resolve());

  // /////////////////////////////////////
  // Execute field-level hooks and access
  // /////////////////////////////////////

  doc = await afterRead({
    depth,
    doc,
    entityConfig: globalConfig,
    req,
    overrideAccess,
    showHiddenFields,
  });

  // /////////////////////////////////////
  // Execute after global hook
  // /////////////////////////////////////

  await globalConfig.hooks.afterRead.reduce(async (priorHook, hook) => {
    await priorHook;

    doc = await hook({
      req,
      doc,
    }) || doc;
  }, Promise.resolve());

  // /////////////////////////////////////
  // Return results
  // /////////////////////////////////////

  return doc;
}

export default findOne;
