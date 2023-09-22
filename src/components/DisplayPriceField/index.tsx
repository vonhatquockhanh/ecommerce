import React, { useCallback, useEffect, useState } from 'react';
import { useDocumentInfo } from '../../payload/admin/components/utilities/DocumentInfo';
import './styles.scss';
import { useFormFields, useWatchForm } from '../../payload/admin/components/forms/Form/context';
import { requests } from '../../payload/admin/api';
import { useAuth } from '../../payload/admin/components/utilities/Auth';
import payload from '../../payload';
import { useTranslation } from 'react-i18next';

function formatAmount(amount: string): string {
    if (!amount) return '';
    return amount.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

const DisplayPriceField: React.FC = () => {
  const supplierId = useFormFields(([fields]) => fields.supplierId);
  const productTotalPrice = useFormFields(([fields]) => fields.product_total_price);
  const { t } = useTranslation('fields');

//   const { fields } = useWatchForm();
  const [displayPrice, setDisplayPrice] = useState('');
  const [spreadPercent, setSpreadPercent] = useState(0);
  
//   console.log('user:', user)
    // console.log('fields supplierId:', fields["supplierId"].value);

    const getSupplySpreadPercent = useCallback(async (sId: string) => {
        try {
            const res = await requests.get(`/api/supplier/${sId}`)
            const result = await res.json();
            if (result?.spread_percent) {
                setSpreadPercent(result?.spread_percent);
            } else {
                setSpreadPercent(0);
            }
        } catch (error) {
            setSpreadPercent(0);
        }
    }, [supplierId.value])

    useEffect(() => {
        if (supplierId.value) {
            getSupplySpreadPercent(supplierId.value as string);
        }
    }, [supplierId.value]);

    useEffect(() => {
        if (productTotalPrice) {
            const parsePrice = productTotalPrice.value as number;
            try {
                const calcPrice = (parsePrice + (spreadPercent/100 * parsePrice)).toFixed(0);
                setDisplayPrice(`${formatAmount(calcPrice)}`);
            } catch (error) {
                setDisplayPrice(`${formatAmount(`${parsePrice}`)}`);
            }
        }
    }, [productTotalPrice, spreadPercent]);

  return (
    <div className='product-display-price'>
       <span>{t('displayPrice')}</span>
      <strong>{displayPrice}</strong>
    </div>
  );
};

export default DisplayPriceField;
