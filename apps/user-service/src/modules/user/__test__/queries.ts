import { CreateUserInput, UpdateUserInput } from "../../../libs/types";

export const getUserById = (_id: string) => {
  return {
    query: ` 
      query getUserById($_id: ID!) {
        getUserById(_id: $_id) {
          _id
          createdAt
          updatedAt
          firstName
lastName
email
password
lastLoggedIn
        }
      }
      `,
    variables: {
      _id: _id,
    },
  };
};

export const getAllUser = (search: string, filter: any, sort: any, limit: number, offset: number) => {
  return {
    query: `
      query getAllUser($search:String, $filter: JSON, $sort: JSON, $limit: Int, $offset: Int) {
        getAllUser(search:$search, filter: $filter, sort: $sort, limit: $limit, offset: $offset) {
          _id
          createdAt
          updatedAt
          firstName
lastName
email
password
lastLoggedIn
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

export const getOneUser = (filter: any, sort: any) => {
  return {
    query: `
      query getOneUser($filter: JSON, $sort: JSON) {
        getOneUser(filter: $filter, sort: $sort) {
          _id
          createdAt
          updatedAt
          firstName
lastName
email
password
lastLoggedIn
        }
      }
  `,
    variables: {
      filter: filter,
      sort: sort,
    },
  };
};

export const getAllUserCount = (search: string, filter: any) => {
  return {
    query: `
      query getAllUserCount($search: String, $filter: JSON) {
        getAllUserCount(filter: $filter, search: $search) 
      }
  `,
    variables: {
      search: search,
      filter: filter,
    },
  };
};

export const createUser = (data: CreateUserInput) => {
  return {
    query: `
      mutation createUser($data: CreateUserInput!) {
        createUser(data: $data) {
          _id
          createdAt
          updatedAt
          firstName
lastName
email
password
lastLoggedIn
        }
      }
  `,
    variables: {
      data: data,
    },
  };
};

export const createManyUser = (datas: CreateUserInput[]) => {
  return {
    query: `
      mutation createManyUser($datas: [CreateUserInput!]!) {
        createManyUser(datas: $datas) {
          _id
          createdAt
          updatedAt
          firstName
lastName
email
password
lastLoggedIn
        }
      }
  `,
    variables: {
      datas: datas,
    },
  };
};

export const updateUser = (data: UpdateUserInput) => {
  return {
    query: `
      mutation updateUser($data: UpdateUserInput!) {
        updateUser(data: $data) {
          _id
          createdAt
          updatedAt
          firstName
lastName
email
password
lastLoggedIn
        }
      }
  `,
    variables: {
      data: data,
    },
  };
};

export const updateManyUser = (datas: UpdateUserInput[]) => {
  return {
    query: `
      mutation updateManyUser($datas: [UpdateUserInput!]!) {
        updateManyUser(datas: $datas) {
          _id
          createdAt
          updatedAt
          firstName
lastName
email
password
lastLoggedIn
        }
      }
  `,
    variables: {
      datas: datas,
    },
  };
};

export const deleteUser = (_id: string) => {
  return {
    query: `
      mutation deleteUser($_id: ID!) {
        deleteUser(_id: $_id) {
          _id
          createdAt
          updatedAt
          firstName
lastName
email
password
lastLoggedIn
        }
      }
  `,
    variables: {
      _id: _id,
    },
  };
};

export const deleteManyUser = (filter: any) => {
  return {
    query: `
      mutation deleteManyUser($filter: JSON!) {
        deleteManyUser(filter: $filter) {
          _id
          createdAt
          updatedAt
          firstName
lastName
email
password
lastLoggedIn
        }
      }
  `,
    variables: {
      filter: filter,
    },
  };
};
