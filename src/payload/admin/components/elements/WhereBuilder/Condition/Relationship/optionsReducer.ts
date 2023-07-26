import { Option, Action } from './types';
import { getTranslation } from '../../../../../../utilities/getTranslation';

const reduceToIDs = (options) => options.reduce((ids, option) => {
  if (option.options) {
    return [
      ...ids,
      ...reduceToIDs(option.options),
    ];
  }

  return [
    ...ids,
    option.id,
  ];
}, []);

const optionsReducer = (state: Option[], action: Action): Option[] => {
  switch (action.type) {
    case 'CLEAR': {
      return action.required ? [] : [{ value: 'null', label: action.i18n.t('general:none') }];
    }

    case 'ADD': {
      const { hasMultipleRelations, collection, relation, data, i18n } = action;

      const labelKey = collection.admin.useAsTitle || 'id';

      const loadedIDs = reduceToIDs(state);

      if (!hasMultipleRelations) {
        return [
          ...state,
          ...data.docs.reduce((docs, doc) => {
            if (loadedIDs.indexOf(doc.id) === -1) {
              loadedIDs.push(doc.id);
              return [
                ...docs,
                {
                  label: doc[labelKey],
                  value: doc.id,
                },
              ];
            }
            return docs;
          }, []),
        ];
      }

      const newOptions = [...state];
      const optionsToAddTo = newOptions.find((optionGroup) => optionGroup.label === getTranslation(collection.labels.plural, i18n));

      const newSubOptions = data.docs.reduce((docs, doc) => {
        if (loadedIDs.indexOf(doc.id) === -1) {
          loadedIDs.push(doc.id);

          return [
            ...docs,
            {
              label: doc[labelKey],
              relationTo: relation,
              value: doc.id,
            },
          ];
        }

        return docs;
      }, []);

      if (optionsToAddTo) {
        optionsToAddTo.options = [
          ...optionsToAddTo.options,
          ...newSubOptions,
        ];
      } else {
        newOptions.push({
          label: getTranslation(collection.labels.plural, i18n),
          options: newSubOptions,
          value: undefined,
        });
      }

      return newOptions;
    }


    default: {
      return state;
    }
  }
};

export default optionsReducer;
