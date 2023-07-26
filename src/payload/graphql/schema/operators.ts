const operators = {
  equality: ['equals', 'not_equals'],
  partial: ['like', 'contains'],
  contains: ['in', 'not_in', 'all'],
  comparison: ['greater_than_equal', 'greater_than', 'less_than_equal', 'less_than'],
  geo: ['near'],
};

export default operators;
