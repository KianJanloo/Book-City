export class OrderValidatorDto {
  order: 'ASC' | 'DESC';
  sort: string;
  allowedSortFields: string[];
}

export const orderValidator = ({
  allowedSortFields,
  order,
  sort,
}: OrderValidatorDto) => {
  let orderBy = {};
  if (
    sort &&
    allowedSortFields.includes(sort) &&
    order &&
    ['ASC', 'DESC'].includes(order)
  ) {
    orderBy = { [sort]: order };
  }

  return orderBy;
};
