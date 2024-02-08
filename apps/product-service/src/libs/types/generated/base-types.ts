import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
import { IProductDocument } from '../../../modules/product/product.model';
import { IUserProductDocument } from '../../../modules/userProduct/userProduct.model';
import { ProductServiceContext } from '../index';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type FieldWrapper<T> = T;
export type RequireFields<T, K extends keyof T> = Omit<T, K> & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTime: { input: Date; output: Date; }
  EmailAddress: { input: string; output: string; }
  JSON: { input: any; output: any; }
  _FieldSet: { input: any; output: any; }
};

export type CachePurgeInput = {
  identifier?: InputMaybe<Scalars['String']['input']>;
  types: Array<Scalars['String']['input']>;
};

export type CreateProductInput = {
  isAvailable?: InputMaybe<Scalars['Boolean']['input']>;
  price: Scalars['Int']['input'];
  productDescription?: InputMaybe<Scalars['String']['input']>;
  productName: Scalars['String']['input'];
};

export type CreateUserProductInput = {
  isFav?: InputMaybe<Scalars['Boolean']['input']>;
  productId: Scalars['ID']['input'];
  userId: Scalars['ID']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createManyProduct: Array<FieldWrapper<Product>>;
  createManyUserProduct: Array<FieldWrapper<UserProduct>>;
  createProduct: FieldWrapper<Product>;
  createUserProduct: FieldWrapper<UserProduct>;
  deleteManyProduct: Array<FieldWrapper<Product>>;
  deleteManyUserProduct: Array<FieldWrapper<UserProduct>>;
  deleteProduct: FieldWrapper<Product>;
  deleteUserProduct: FieldWrapper<UserProduct>;
  updateManyProduct: Array<FieldWrapper<Product>>;
  updateManyUserProduct: Array<FieldWrapper<UserProduct>>;
  updateProduct: FieldWrapper<Product>;
  updateUserProduct: FieldWrapper<UserProduct>;
};


export type MutationCreateManyProductArgs = {
  datas: Array<CreateProductInput>;
};


export type MutationCreateManyUserProductArgs = {
  datas: Array<CreateUserProductInput>;
};


export type MutationCreateProductArgs = {
  data: CreateProductInput;
};


export type MutationCreateUserProductArgs = {
  data: CreateUserProductInput;
};


export type MutationDeleteManyProductArgs = {
  filter: Scalars['JSON']['input'];
};


export type MutationDeleteManyUserProductArgs = {
  filter: Scalars['JSON']['input'];
};


export type MutationDeleteProductArgs = {
  _id: Scalars['ID']['input'];
};


export type MutationDeleteUserProductArgs = {
  _id: Scalars['ID']['input'];
};


export type MutationUpdateManyProductArgs = {
  datas: Array<UpdateProductInput>;
};


export type MutationUpdateManyUserProductArgs = {
  datas: Array<UpdateUserProductInput>;
};


export type MutationUpdateProductArgs = {
  data: UpdateProductInput;
};


export type MutationUpdateUserProductArgs = {
  data: UpdateUserProductInput;
};

export type Product = {
  __typename?: 'Product';
  _id: FieldWrapper<Scalars['ID']['output']>;
  createdAt?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
  isAvailable?: Maybe<FieldWrapper<Scalars['Boolean']['output']>>;
  price: FieldWrapper<Scalars['Int']['output']>;
  productDescription?: Maybe<FieldWrapper<Scalars['String']['output']>>;
  productName: FieldWrapper<Scalars['String']['output']>;
  updatedAt?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
};

export type Query = {
  __typename?: 'Query';
  getAllProduct: Array<Maybe<FieldWrapper<Product>>>;
  getAllProductCount: FieldWrapper<Scalars['Int']['output']>;
  getAllUserProduct: Array<Maybe<FieldWrapper<UserProduct>>>;
  getAllUserProductCount: FieldWrapper<Scalars['Int']['output']>;
  getOneProduct?: Maybe<FieldWrapper<Product>>;
  getOneUserProduct?: Maybe<FieldWrapper<UserProduct>>;
  getProductById?: Maybe<FieldWrapper<Product>>;
  getUserProductById?: Maybe<FieldWrapper<UserProduct>>;
  productServiceHello: FieldWrapper<Scalars['String']['output']>;
};


export type QueryGetAllProductArgs = {
  filter?: InputMaybe<Scalars['JSON']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['JSON']['input']>;
};


export type QueryGetAllProductCountArgs = {
  filter?: InputMaybe<Scalars['JSON']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetAllUserProductArgs = {
  filter?: InputMaybe<Scalars['JSON']['input']>;
  limit?: InputMaybe<Scalars['Int']['input']>;
  offset?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['JSON']['input']>;
};


export type QueryGetAllUserProductCountArgs = {
  filter?: InputMaybe<Scalars['JSON']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
};


export type QueryGetOneProductArgs = {
  filter?: InputMaybe<Scalars['JSON']['input']>;
  sort?: InputMaybe<Scalars['JSON']['input']>;
};


export type QueryGetOneUserProductArgs = {
  filter?: InputMaybe<Scalars['JSON']['input']>;
  sort?: InputMaybe<Scalars['JSON']['input']>;
};


export type QueryGetProductByIdArgs = {
  _id: Scalars['ID']['input'];
};


export type QueryGetUserProductByIdArgs = {
  _id: Scalars['ID']['input'];
};

export type UpdateProductInput = {
  _id: Scalars['ID']['input'];
  isAvailable?: InputMaybe<Scalars['Boolean']['input']>;
  price?: InputMaybe<Scalars['Int']['input']>;
  productDescription?: InputMaybe<Scalars['String']['input']>;
  productName?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateUserProductInput = {
  _id: Scalars['ID']['input'];
  isFav?: InputMaybe<Scalars['Boolean']['input']>;
  productId?: InputMaybe<Scalars['ID']['input']>;
  userId?: InputMaybe<Scalars['ID']['input']>;
};

export type UserProduct = {
  __typename?: 'UserProduct';
  _id: FieldWrapper<Scalars['ID']['output']>;
  createdAt?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
  isFav?: Maybe<FieldWrapper<Scalars['Boolean']['output']>>;
  productId: FieldWrapper<Scalars['ID']['output']>;
  updatedAt?: Maybe<FieldWrapper<Scalars['DateTime']['output']>>;
  userId: FieldWrapper<Scalars['ID']['output']>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type UnwrappedObject<T> = {
        [P in keyof T]: T[P] extends infer R | Promise<infer R> | (() => infer R2 | Promise<infer R2>)
          ? R & R2 : T[P]
      };
export type ReferenceResolver<TResult, TReference, TContext> = (
      reference: TReference,
      context: TContext,
      info: GraphQLResolveInfo
    ) => Promise<TResult> | TResult;

      type ScalarCheck<T, S> = S extends true ? T : NullableCheck<T, S>;
      type NullableCheck<T, S> = Maybe<T> extends T ? Maybe<ListCheck<NonNullable<T>, S>> : ListCheck<T, S>;
      type ListCheck<T, S> = T extends (infer U)[] ? NullableCheck<U, S>[] : GraphQLRecursivePick<T, S>;
      export type GraphQLRecursivePick<T, S> = { [K in keyof T & keyof S]: ScalarCheck<T[K], S[K]> };
    

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> = ResolverFn<TResult, TParent, TContext, TArgs> | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;



/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  CachePurgeInput: CachePurgeInput;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  CreateProductInput: CreateProductInput;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  CreateUserProductInput: CreateUserProductInput;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  EmailAddress: ResolverTypeWrapper<Scalars['EmailAddress']['output']>;
  JSON: ResolverTypeWrapper<Scalars['JSON']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  Product: ResolverTypeWrapper<IProductDocument>;
  Query: ResolverTypeWrapper<{}>;
  UpdateProductInput: UpdateProductInput;
  UpdateUserProductInput: UpdateUserProductInput;
  UserProduct: ResolverTypeWrapper<IUserProductDocument>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  CachePurgeInput: CachePurgeInput;
  String: Scalars['String']['output'];
  CreateProductInput: CreateProductInput;
  Boolean: Scalars['Boolean']['output'];
  Int: Scalars['Int']['output'];
  CreateUserProductInput: CreateUserProductInput;
  ID: Scalars['ID']['output'];
  DateTime: Scalars['DateTime']['output'];
  EmailAddress: Scalars['EmailAddress']['output'];
  JSON: Scalars['JSON']['output'];
  Mutation: {};
  Product: IProductDocument;
  Query: {};
  UpdateProductInput: UpdateProductInput;
  UpdateUserProductInput: UpdateUserProductInput;
  UserProduct: IUserProductDocument;
}>;

export type CachePurgeDirectiveArgs = {
  payloads: Array<CachePurgeInput>;
};

export type CachePurgeDirectiveResolver<Result, Parent, ContextType = ProductServiceContext, Args = CachePurgeDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type CacheSetDirectiveArgs = {
  identifier: Scalars['String']['input'];
  maxAge?: Maybe<Scalars['Int']['input']>;
  type: Scalars['String']['input'];
};

export type CacheSetDirectiveResolver<Result, Parent, ContextType = ProductServiceContext, Args = CacheSetDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export type ServiceAdminDirectiveArgs = { };

export type ServiceAdminDirectiveResolver<Result, Parent, ContextType = ProductServiceContext, Args = ServiceAdminDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export interface DateTimeScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export interface EmailAddressScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['EmailAddress'], any> {
  name: 'EmailAddress';
}

export interface JsonScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export type MutationResolvers<ContextType = ProductServiceContext, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  createManyProduct?: Resolver<Array<ResolversTypes['Product']>, ParentType, ContextType, RequireFields<MutationCreateManyProductArgs, 'datas'>>;
  createManyUserProduct?: Resolver<Array<ResolversTypes['UserProduct']>, ParentType, ContextType, RequireFields<MutationCreateManyUserProductArgs, 'datas'>>;
  createProduct?: Resolver<ResolversTypes['Product'], ParentType, ContextType, RequireFields<MutationCreateProductArgs, 'data'>>;
  createUserProduct?: Resolver<ResolversTypes['UserProduct'], ParentType, ContextType, RequireFields<MutationCreateUserProductArgs, 'data'>>;
  deleteManyProduct?: Resolver<Array<ResolversTypes['Product']>, ParentType, ContextType, RequireFields<MutationDeleteManyProductArgs, 'filter'>>;
  deleteManyUserProduct?: Resolver<Array<ResolversTypes['UserProduct']>, ParentType, ContextType, RequireFields<MutationDeleteManyUserProductArgs, 'filter'>>;
  deleteProduct?: Resolver<ResolversTypes['Product'], ParentType, ContextType, RequireFields<MutationDeleteProductArgs, '_id'>>;
  deleteUserProduct?: Resolver<ResolversTypes['UserProduct'], ParentType, ContextType, RequireFields<MutationDeleteUserProductArgs, '_id'>>;
  updateManyProduct?: Resolver<Array<ResolversTypes['Product']>, ParentType, ContextType, RequireFields<MutationUpdateManyProductArgs, 'datas'>>;
  updateManyUserProduct?: Resolver<Array<ResolversTypes['UserProduct']>, ParentType, ContextType, RequireFields<MutationUpdateManyUserProductArgs, 'datas'>>;
  updateProduct?: Resolver<ResolversTypes['Product'], ParentType, ContextType, RequireFields<MutationUpdateProductArgs, 'data'>>;
  updateUserProduct?: Resolver<ResolversTypes['UserProduct'], ParentType, ContextType, RequireFields<MutationUpdateUserProductArgs, 'data'>>;
}>;

export type ProductResolvers<ContextType = ProductServiceContext, ParentType extends ResolversParentTypes['Product'] = ResolversParentTypes['Product']> = ResolversObject<{
  __resolveReference?: ReferenceResolver<Maybe<ResolversTypes['Product']>, { __typename: 'Product' } & GraphQLRecursivePick<UnwrappedObject<ParentType>, {"_id":true}>, ContextType>;
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  isAvailable?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  price?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  productDescription?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  productName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type QueryResolvers<ContextType = ProductServiceContext, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  getAllProduct?: Resolver<Array<Maybe<ResolversTypes['Product']>>, ParentType, ContextType, Partial<QueryGetAllProductArgs>>;
  getAllProductCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType, Partial<QueryGetAllProductCountArgs>>;
  getAllUserProduct?: Resolver<Array<Maybe<ResolversTypes['UserProduct']>>, ParentType, ContextType, Partial<QueryGetAllUserProductArgs>>;
  getAllUserProductCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType, Partial<QueryGetAllUserProductCountArgs>>;
  getOneProduct?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType, Partial<QueryGetOneProductArgs>>;
  getOneUserProduct?: Resolver<Maybe<ResolversTypes['UserProduct']>, ParentType, ContextType, Partial<QueryGetOneUserProductArgs>>;
  getProductById?: Resolver<Maybe<ResolversTypes['Product']>, ParentType, ContextType, RequireFields<QueryGetProductByIdArgs, '_id'>>;
  getUserProductById?: Resolver<Maybe<ResolversTypes['UserProduct']>, ParentType, ContextType, RequireFields<QueryGetUserProductByIdArgs, '_id'>>;
  productServiceHello?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
}>;

export type UserProductResolvers<ContextType = ProductServiceContext, ParentType extends ResolversParentTypes['UserProduct'] = ResolversParentTypes['UserProduct']> = ResolversObject<{
  __resolveReference?: ReferenceResolver<Maybe<ResolversTypes['UserProduct']>, { __typename: 'UserProduct' } & GraphQLRecursivePick<UnwrappedObject<ParentType>, {"_id":true}>, ContextType>;
  _id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  createdAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  isFav?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  productId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  updatedAt?: Resolver<Maybe<ResolversTypes['DateTime']>, ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
}>;

export type Resolvers<ContextType = ProductServiceContext> = ResolversObject<{
  DateTime?: GraphQLScalarType;
  EmailAddress?: GraphQLScalarType;
  JSON?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Product?: ProductResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  UserProduct?: UserProductResolvers<ContextType>;
}>;

export type DirectiveResolvers<ContextType = ProductServiceContext> = ResolversObject<{
  cachePurge?: CachePurgeDirectiveResolver<any, any, ContextType>;
  cacheSet?: CacheSetDirectiveResolver<any, any, ContextType>;
  serviceAdmin?: ServiceAdminDirectiveResolver<any, any, ContextType>;
}>;
