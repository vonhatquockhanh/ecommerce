import me from '../../operations/me';
import { Collection } from '../../../collections/config/types';

function meResolver(collection: Collection): any {
  async function resolver(_, args, context) {
    const options = {
      collection,
      req: context.req,
    };
    return me(options);
  }
  return resolver;
}

export default meResolver;
