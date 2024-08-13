import items from "./items.json";

export const getCollectionItems = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(items);
    });
  });
};
