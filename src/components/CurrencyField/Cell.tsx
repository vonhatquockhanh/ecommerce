import React from 'react';
import { Props } from '../../payload/admin/components/views/collections/List/Cell/types'
import './styles.scss';

function formatCurrency(value: number): string {
  if (!value) return '';
  return `${value}`?.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
}

const Cell: React.FC<Props> = (props) => {
  const { cellData } = props;

  if (!cellData) return null;
  return (
    <span>
      {formatCurrency(cellData as number)}
    </span>
  )
}

export default Cell;