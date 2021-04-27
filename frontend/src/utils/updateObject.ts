export const updateObject = (oldOject: Object, othersProperties: any) => {
  return {
    ...oldOject,
    ...othersProperties,
  };
};
