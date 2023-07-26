import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useConfig } from '../../../../../../utilities/Config';
import useIntersect from '../../../../../../../hooks/useIntersect';
import { useListRelationships } from '../../../RelationshipProvider';
import { getTranslation } from '../../../../../../../../utilities/getTranslation';

import './index.scss';

type Value = { relationTo: string, value: number | string };
const baseClass = 'relationship-cell';
const totalToShow = 3;

const RelationshipCell = (props) => {
  const { field, data: cellData } = props;
  const { collections, routes } = useConfig();
  const [intersectionRef, entry] = useIntersect();
  const [values, setValues] = useState<Value[]>([]);
  const { getRelationships, documents } = useListRelationships();
  const [hasRequested, setHasRequested] = useState(false);
  const { t, i18n } = useTranslation('general');

  const isAboveViewport = entry?.boundingClientRect?.top < window.innerHeight;

  useEffect(() => {
    if (cellData && isAboveViewport && !hasRequested) {
      const formattedValues: Value[] = [];

      const arrayCellData = Array.isArray(cellData) ? cellData : [cellData];
      arrayCellData.slice(0, (arrayCellData.length < totalToShow ? arrayCellData.length : totalToShow)).forEach((cell) => {
        if (typeof cell === 'object' && 'relationTo' in cell && 'value' in cell) {
          formattedValues.push(cell);
        }
        if ((typeof cell === 'number' || typeof cell === 'string') && typeof field.relationTo === 'string') {
          formattedValues.push({
            value: cell,
            relationTo: field.relationTo,
          });
        }
      });
      getRelationships(formattedValues);
      setHasRequested(true);
      setValues(formattedValues);
    }
  }, [cellData, field, collections, isAboveViewport, routes.api, hasRequested, getRelationships]);

  return (
    <div
      className={baseClass}
      ref={intersectionRef}
    >
      {values.map(({ relationTo, value }, i) => {
        const document = documents[relationTo][value];
        const relatedCollection = collections.find(({ slug }) => slug === relationTo);
        const label = document?.[relatedCollection.admin.useAsTitle] ? document[relatedCollection.admin.useAsTitle] : `${t('untitled')} - ID: ${value}`;

        return (
          <React.Fragment key={i}>
            {document === false && `${t('untitled')} - ID: ${value}`}
            {document === null && `${t('loading')}...`}
            {document && label}
            {values.length > i + 1 && ', '}
          </React.Fragment>
        );
      })}
      {
        Array.isArray(cellData) && cellData.length > totalToShow
        && t('fields:itemsAndMore', { items: '', count: cellData.length - totalToShow })
      }
      {values.length === 0 && t('noLabel', { label: getTranslation(field.label, i18n) })}
    </div>
  );
};

export default RelationshipCell;
