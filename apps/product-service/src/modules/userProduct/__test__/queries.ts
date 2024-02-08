import { CreateUserProductInput, UpdateUserProductInput } from "../../../libs/types";

export const getUserProductById = (_id: string) => {
  return {
    query: ` 
      query getUserProductById($_id: ID!) {
        getUserProductById(_id: $_id) {
          _id
          createdAt
          updatedAt
          userId
productId
isFav
        }
      }
      `,
    variables: {
      _id: _id,
    },
  };
};

export const getAllUserProduct = (search: string, filter: any, sort: any, limit: number, offset: number) => {
  return {
    query: `
      query getAllUserProduct($search:String, $filter: JSON, $sort: JSON, $limit: Int, $offset: Int) {
        getAllUserProduct(search:$search, filter: $filter, sort: $sort, limit: $limit, offset: $offset) {
          _id
          createdAt
          updatedAt
          userId
productId
isFav
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

export const getOneUserProduct = (filter: any, sort: any) => {
  return {
    query: `
      query getOneUserProduct($filter: JSON, $sort: JSON) {
        getOneUserProduct(filter: $filter, sort: $sort) {
          _id
          createdAt
          updatedAt
          userId
productId
isFav
        }
      }
  `,
    variables: {
      filter: filter,
      sort: sort,
    },
  };
};

export const getAllUserProductCount = (search: string, filter: any) => {
  return {
    query: `
      query getAllUserProductCount($search: String, $filter: JSON) {
        getAllUserProductCount(filter: $filter, search: $search) 
      }
  `,
    variables: {
      search: search,
      filter: filter,
    },
  };
};

export const createUserProduct = (data: CreateUserProductInput) => {
  return {
    query: `
      mutation createUserProduct($data: CreateUserProductInput!) {
        createUserProduct(data: $data) {
          _id
          createdAt
          updatedAt
          userId
productId
isFav
        }
      }
  `,
    variables: {
      data: data,
    },
  };
};

export const createManyUserProduct = (datas: CreateUserProductInput[]) => {
  return {
    query: `
      mutation createManyUserProduct($datas: [CreateUserProductInput!]!) {
        createManyUserProduct(datas: $datas) {
          _id
          createdAt
          updatedAt
          userId
productId
isFav
        }
      }
  `,
    variables: {
      datas: datas,
    },
  };
};

export const updateUserProduct = (data: UpdateUserProductInput) => {
  return {
    query: `
      mutation updateUserProduct($data: UpdateUserProductInput!) {
        updateUserProduct(data: $data) {
          _id
          createdAt
          updatedAt
          userId
productId
isFav
        }
      }
  `,
    variables: {
      data: data,
    },
  };
};

export const updateManyUserProduct = (datas: UpdateUserProductInput[]) => {
  return {
    query: `
      mutation updateManyUserProduct($datas: [UpdateUserProductInput!]!) {
        updateManyUserProduct(datas: $datas) {
          _id
          createdAt
          updatedAt
          userId
productId
isFav
        }
      }
  `,
    variables: {
      datas: datas,
    },
  };
};

export const deleteUserProduct = (_id: string) => {
  return {
    query: `
      mutation deleteUserProduct($_id: ID!) {
        deleteUserProduct(_id: $_id) {
          _id
          createdAt
          updatedAt
          userId
productId
isFav
        }
      }
  `,
    variables: {
      _id: _id,
    },
  };
};

export const deleteManyUserProduct = (filter: any) => {
  return {
    query: `
      mutation deleteManyUserProduct($filter: JSON!) {
        deleteManyUserProduct(filter: $filter) {
          _id
          createdAt
          updatedAt
          userId
productId
isFav
        }
      }
  `,
    variables: {
      filter: filter,
    },
  };
};
