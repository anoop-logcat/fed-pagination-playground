import { CreateProductInput, UpdateProductInput } from "../../../libs/types";

export const getProductById = (_id: string) => {
  return {
    query: ` 
      query getProductById($_id: ID!) {
        getProductById(_id: $_id) {
          _id
          createdAt
          updatedAt
          productName
productDescription
price
isAvailable
        }
      }
      `,
    variables: {
      _id: _id,
    },
  };
};

export const getAllProduct = (search: string, filter: any, sort: any, limit: number, offset: number) => {
  return {
    query: `
      query getAllProduct($search:String, $filter: JSON, $sort: JSON, $limit: Int, $offset: Int) {
        getAllProduct(search:$search, filter: $filter, sort: $sort, limit: $limit, offset: $offset) {
          _id
          createdAt
          updatedAt
          productName
productDescription
price
isAvailable
        }
      }
  `,
    variables: {
      search: search,
      filter: filter,
      sort: sort,
      limit: limit,
      offset: offset,
    },
  };
};

export const getOneProduct = (filter: any, sort: any) => {
  return {
    query: `
      query getOneProduct($filter: JSON, $sort: JSON) {
        getOneProduct(filter: $filter, sort: $sort) {
          _id
          createdAt
          updatedAt
          productName
productDescription
price
isAvailable
        }
      }
  `,
    variables: {
      filter: filter,
      sort: sort,
    },
  };
};

export const getAllProductCount = (search: string, filter: any) => {
  return {
    query: `
      query getAllProductCount($search: String, $filter: JSON) {
        getAllProductCount(filter: $filter, search: $search) 
      }
  `,
    variables: {
      search: search,
      filter: filter,
    },
  };
};

export const createProduct = (data: CreateProductInput) => {
  return {
    query: `
      mutation createProduct($data: CreateProductInput!) {
        createProduct(data: $data) {
          _id
          createdAt
          updatedAt
          productName
productDescription
price
isAvailable
        }
      }
  `,
    variables: {
      data: data,
    },
  };
};

export const createManyProduct = (datas: CreateProductInput[]) => {
  return {
    query: `
      mutation createManyProduct($datas: [CreateProductInput!]!) {
        createManyProduct(datas: $datas) {
          _id
          createdAt
          updatedAt
          productName
productDescription
price
isAvailable
        }
      }
  `,
    variables: {
      datas: datas,
    },
  };
};

export const updateProduct = (data: UpdateProductInput) => {
  return {
    query: `
      mutation updateProduct($data: UpdateProductInput!) {
        updateProduct(data: $data) {
          _id
          createdAt
          updatedAt
          productName
productDescription
price
isAvailable
        }
      }
  `,
    variables: {
      data: data,
    },
  };
};

export const updateManyProduct = (datas: UpdateProductInput[]) => {
  return {
    query: `
      mutation updateManyProduct($datas: [UpdateProductInput!]!) {
        updateManyProduct(datas: $datas) {
          _id
          createdAt
          updatedAt
          productName
productDescription
price
isAvailable
        }
      }
  `,
    variables: {
      datas: datas,
    },
  };
};

export const deleteProduct = (_id: string) => {
  return {
    query: `
      mutation deleteProduct($_id: ID!) {
        deleteProduct(_id: $_id) {
          _id
          createdAt
          updatedAt
          productName
productDescription
price
isAvailable
        }
      }
  `,
    variables: {
      _id: _id,
    },
  };
};

export const deleteManyProduct = (filter: any) => {
  return {
    query: `
      mutation deleteManyProduct($filter: JSON!) {
        deleteManyProduct(filter: $filter) {
          _id
          createdAt
          updatedAt
          productName
productDescription
price
isAvailable
        }
      }
  `,
    variables: {
      filter: filter,
    },
  };
};
