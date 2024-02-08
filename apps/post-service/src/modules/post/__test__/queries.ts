import { CreatePostInput, UpdatePostInput } from "../../../libs/types";

export const getPostById = (_id: string) => {
  return {
    query: ` 
      query getPostById($_id: ID!) {
        getPostById(_id: $_id) {
          _id
          createdAt
          updatedAt
          title
description
imageUrl
createdBy
        }
      }
      `,
    variables: {
      _id: _id,
    },
  };
};

export const getAllPost = (search: string, filter: any, sort: any, limit: number, offset: number) => {
  return {
    query: `
      query getAllPost($search:String, $filter: JSON, $sort: JSON, $limit: Int, $offset: Int) {
        getAllPost(search:$search, filter: $filter, sort: $sort, limit: $limit, offset: $offset) {
          _id
          createdAt
          updatedAt
          title
description
imageUrl
createdBy
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

export const getOnePost = (filter: any, sort: any) => {
  return {
    query: `
      query getOnePost($filter: JSON, $sort: JSON) {
        getOnePost(filter: $filter, sort: $sort) {
          _id
          createdAt
          updatedAt
          title
description
imageUrl
createdBy
        }
      }
  `,
    variables: {
      filter: filter,
      sort: sort,
    },
  };
};

export const getAllPostCount = (search: string, filter: any) => {
  return {
    query: `
      query getAllPostCount($search: String, $filter: JSON) {
        getAllPostCount(filter: $filter, search: $search) 
      }
  `,
    variables: {
      search: search,
      filter: filter,
    },
  };
};

export const createPost = (data: CreatePostInput) => {
  return {
    query: `
      mutation createPost($data: CreatePostInput!) {
        createPost(data: $data) {
          _id
          createdAt
          updatedAt
          title
description
imageUrl
createdBy
        }
      }
  `,
    variables: {
      data: data,
    },
  };
};

export const createManyPost = (datas: CreatePostInput[]) => {
  return {
    query: `
      mutation createManyPost($datas: [CreatePostInput!]!) {
        createManyPost(datas: $datas) {
          _id
          createdAt
          updatedAt
          title
description
imageUrl
createdBy
        }
      }
  `,
    variables: {
      datas: datas,
    },
  };
};

export const updatePost = (data: UpdatePostInput) => {
  return {
    query: `
      mutation updatePost($data: UpdatePostInput!) {
        updatePost(data: $data) {
          _id
          createdAt
          updatedAt
          title
description
imageUrl
createdBy
        }
      }
  `,
    variables: {
      data: data,
    },
  };
};

export const updateManyPost = (datas: UpdatePostInput[]) => {
  return {
    query: `
      mutation updateManyPost($datas: [UpdatePostInput!]!) {
        updateManyPost(datas: $datas) {
          _id
          createdAt
          updatedAt
          title
description
imageUrl
createdBy
        }
      }
  `,
    variables: {
      datas: datas,
    },
  };
};

export const deletePost = (_id: string) => {
  return {
    query: `
      mutation deletePost($_id: ID!) {
        deletePost(_id: $_id) {
          _id
          createdAt
          updatedAt
          title
description
imageUrl
createdBy
        }
      }
  `,
    variables: {
      _id: _id,
    },
  };
};

export const deleteManyPost = (filter: any) => {
  return {
    query: `
      mutation deleteManyPost($filter: JSON!) {
        deleteManyPost(filter: $filter) {
          _id
          createdAt
          updatedAt
          title
description
imageUrl
createdBy
        }
      }
  `,
    variables: {
      filter: filter,
    },
  };
};
