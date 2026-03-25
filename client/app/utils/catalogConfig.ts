export const getSortParams = (sort: string) => {
  switch (sort) {
    case "new":
      return {
        sortColumn: "createdAt",
        sortDirection: "desc",
      };
    case "old":
      return {
        sortColumn: "createdAt",
        sortDirection: "asc",
      };
    case "min-name":
      return {
        sortColumn: "title",
        sortDirection: "asc",
      };
    case "max-name":
      return {
        sortColumn: "title",
        sortDirection: "desc",
      };
    case "min-price":
      return {
        sortColumn: "price",
        sortDirection: "asc",
      };
    case "max-price":
      return {
        sortColumn: "price",
        sortDirection: "desc",
      };
    default:
      return {};
  }
};
