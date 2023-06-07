export const removeDuplicateValue = (array) => {
  const newArray = Object.values(
    array.reduce((a, { name, image }) => {
      a[name] = a[name] || { name, image: new Set() };
      a[name].image.add(image);
      return a;
    }, {})
  ).map(({ name, image }) => ({ name, image: [...image] }));
  return newArray;
};
