import { Option, Action, OptionGroup } from './types';
import { getTranslation } from '../../../../../utilities/getTranslation';

const reduceToIDs = (options) => options.reduce((ids, option) => {
  if (option.options) {
    return [
      ...ids,
      ...reduceToIDs(option.options),
    ];
  }

  return [
    ...ids,
    option.value,
  ];
}, []);

const sortOptions = (options: Option[]): Option[] => options.sort((a: Option, b: Option) => {
  if (typeof a?.label?.localeCompare === 'function' && typeof b?.label?.localeCompare === 'function') {
    return a.label.localeCompare(b.label);
  }

  return 0;
});

const optionsReducer = (state: OptionGroup[], action: Action): OptionGroup[] => {
  switch (action.type) {
    case 'CLEAR': {
      return [];
    }

    case 'UPDATE': {
      const { collection, doc, i18n } = action;
      const relation = collection.slug;
      const newOptions = [...state];
      const labelKey = collection.admin.useAsTitle || 'id';
      const foundOptionGroup = newOptions.find((optionGroup) => optionGroup.label === collection.labels.plural);
      const foundOption = foundOptionGroup?.options?.find((option) => option.value === doc.id);

      if (foundOption) {
        foundOption.label = doc[labelKey] || `${i18n.t('general:untitled')} - ID: ${doc.id}`;
        foundOption.relationTo = relation;
      }

      return newOptions;
    }

    case 'ADD': {
      const { collection, docs, sort, ids = [], i18n } = action;
      const relation = collection.slug;
      const labelKey = collection.admin.useAsTitle || 'id';
      const loadedIDs = reduceToIDs(state);
      const newOptions = [...state];
      const optionsToAddTo = newOptions.find((optionGroup) => optionGroup.label === collection.labels.plural);

      const newSubOptions = docs.reduce((docSubOptions, doc) => {
        if (loadedIDs.indexOf(doc.id) === -1) {
          loadedIDs.push(doc.id);

          return [
            ...docSubOptions,
            {
              label: doc[labelKey] || `${i18n.t('general:untitled')} - ID: ${doc.id}`,
              relationTo: relation,
              value: doc.id,
            },
          ];
        }

        return docSubOptions;
      }, []);

      ids.forEach((id) => {
        if (!loadedIDs.includes(id)) {
          newSubOptions.push({
            relationTo: relation,
            label: labelKey === 'id' ? id : `${i18n.t('general:untitled')} - ID: ${id}`,
            value: id,
          });
        }
      });

      if (optionsToAddTo) {
        const subOptions = [
          ...optionsToAddTo.options,
          ...newSubOptions,
        ];

        optionsToAddTo.options = sort ? sortOptions(subOptions) : subOptions;
      } else {
        newOptions.push({
          label: getTranslation(collection.labels.plural, i18n),
          options: sort ? sortOptions(newSubOptions) : newSubOptions,
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
