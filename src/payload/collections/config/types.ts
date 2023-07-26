/* eslint-disable @typescript-eslint/no-explicit-any */
import { DeepRequired } from 'ts-essentials';
import { Model, PaginateModel, AggregatePaginateModel } from 'mongoose';
import { GraphQLInputObjectType, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import { Response } from 'express';
import { Access, GeneratePreviewURL, EntityDescription, Endpoint } from '../../config/types';
import { Field } from '../../fields/config/types';
import { PayloadRequest } from '../../express/types';
import { IncomingAuthType, Auth } from '../../auth/types';
import { IncomingUploadType, Upload } from '../../uploads/types';
import { IncomingCollectionVersions, SanitizedCollectionVersions } from '../../versions/types';

type Register<T = any> = (doc: T, password: string) => T;

interface PassportLocalModel {
  register: Register
  authenticate: any
}

export interface CollectionModel extends Model<any>, PaginateModel<any>, AggregatePaginateModel<any>, PassportLocalModel {
  buildQuery: (query: unknown, locale: string, queryHiddenFields?: boolean) => Record<string, unknown>
}

export interface AuthCollectionModel extends CollectionModel {
  resetPasswordToken: string;
  resetPasswordExpiration: Date;
}

export type HookOperationType =
  | 'create'
  | 'autosave'
  | 'read'
  | 'update'
  | 'delete'
  | 'refresh'
  | 'login'
  | 'forgotPassword';

type CreateOrUpdateOperation = Extract<HookOperationType, 'create' | 'update'>;

export type BeforeOperationHook = (args: {
  args?: any;
  /**
   * Hook operation being performed
   */
  operation: HookOperationType;
}) => any;

export type BeforeValidateHook<T extends TypeWithID = any> = (args: {
  data?: Partial<T>;
  req?: PayloadRequest;
  /**
   * Hook operation being performed
   */
  operation: CreateOrUpdateOperation;
  /**
   * Original document before change
   *
   * `undefined` on 'create' operation
   */
  originalDoc?: T;
}) => any;

export type BeforeChangeHook<T extends TypeWithID = any> = (args: {
  data: Partial<T>;
  req: PayloadRequest;
  /**
   * Hook operation being performed
   */
  operation: CreateOrUpdateOperation;
  /**
   * Original document before change
   *
   * `undefined` on 'create' operation
   */
  originalDoc?: T;
}) => any;

export type AfterChangeHook<T extends TypeWithID = any> = (args: {
  doc: T;
  req: PayloadRequest;
  previousDoc: T,
  /**
   * Hook operation being performed
   */
  operation: CreateOrUpdateOperation;
}) => any;

export type BeforeReadHook<T extends TypeWithID = any> = (args: {
  doc: T;
  req: PayloadRequest;
  query: { [key: string]: any };
}) => any;

export type AfterReadHook<T extends TypeWithID = any> = (args: {
  doc: T;
  req: PayloadRequest;
  query?: { [key: string]: any };
  findMany?: boolean
}) => any;

export type BeforeDeleteHook = (args: {
  req: PayloadRequest;
  id: string;
}) => any;

export type AfterDeleteHook<T extends TypeWithID = any> = (args: {
  doc: T;
  req: PayloadRequest;
  id: string;
}) => any;

export type AfterErrorHook = (err: Error, res: unknown) => { response: any, status: number } | void;

export type BeforeLoginHook<T extends TypeWithID = any> = (args: {
  req: PayloadRequest;
  user: T
}) => any;

export type AfterLoginHook<T extends TypeWithID = any> = (args: {
  req: PayloadRequest;
  user: T;
  token: string;
}) => any;

export type AfterLogoutHook<T extends TypeWithID = any> = (args: {
  req: PayloadRequest;
  res: Response;
}) => any;

export type AfterMeHook<T extends TypeWithID = any> = (args: {
  req: PayloadRequest;
  response: unknown;
}) => any;

export type AfterRefreshHook<T extends TypeWithID = any> = (args: {
  req: PayloadRequest;
  res: Response;
  token: string;
  exp: number;
}) => any;

export type AfterForgotPasswordHook = (args: {
  args?: any;
}) => any;

type BeforeDuplicateArgs<T> = {
  data: T
  locale?: string
}

export type BeforeDuplicate<T = any> = (args: BeforeDuplicateArgs<T>) => T | Promise<T>

export type CollectionAdminOptions = {
  /**
   * Field to use as title in Edit view and first column in List view
   */
  useAsTitle?: string;
  /**
   * Default columns to show in list view
   */
  defaultColumns?: string[];
  /**
   * Additional fields to be searched via the full text search
   */
  listSearchableFields?: string[];
  hooks?: {
    /**
     * Function that allows you to modify a document's data before it is duplicated
     */
    beforeDuplicate?: BeforeDuplicate;
  }
  /**
   * Place collections into a navigational group
   * */
  group?: Record<string, string> | string;
  /**
   * Custom description for collection
   */
  description?: EntityDescription;
  disableDuplicate?: boolean;
  /**
   * Hide the API URL within the Edit view
   */
  hideAPIURL?: boolean
  /**
   * Custom admin components
   */
  components?: {
    views?: {
      Edit?: React.ComponentType<any>
      List?: React.ComponentType<any>
    }
  };
  pagination?: {
    defaultLimit?: number
    limits?: number[]
  }
  enableRichTextRelationship?: boolean
  /**
   * Function to generate custom preview URL
   */
  preview?: GeneratePreviewURL
}

/** Manage all aspects of a data collection */
export type CollectionConfig = {
  slug: string;
  /**
   * Label configuration
   */
  labels?: {
    singular?: Record<string, string> | string;
    plural?: Record<string, string> | string;
  };
  /**
   * GraphQL configuration
   */
  graphQL?: {
    singularName?: string
    pluralName?: string
  }
  /**
   * Options used in typescript generation
   */
  typescript?: {
    /**
     * Typescript generation name given to the interface type
     */
    interface?: string
  }
  fields: Field[];
  /**
   * Collection admin options
   */
  admin?: CollectionAdminOptions;
  /**
   * Hooks to modify Payload functionality
   */
  hooks?: {
    beforeOperation?: BeforeOperationHook[];
    beforeValidate?: BeforeValidateHook[];
    beforeChange?: BeforeChangeHook[];
    afterChange?: AfterChangeHook[];
    beforeRead?: BeforeReadHook[];
    afterRead?: AfterReadHook[];
    beforeDelete?: BeforeDeleteHook[];
    afterDelete?: AfterDeleteHook[];
    afterError?: AfterErrorHook;
    beforeLogin?: BeforeLoginHook[];
    afterLogin?: AfterLoginHook[];
    afterLogout?: AfterLogoutHook[];
    afterMe?: AfterMeHook[];
    afterRefresh?: AfterRefreshHook[];
    afterForgotPassword?: AfterForgotPasswordHook[];
  };
  /**
   * Custom rest api endpoints
   */
  endpoints?: Omit<Endpoint, 'root'>[]
  /**
   * Access control
   */
  access?: {
    create?: Access;
    read?: Access;
    readVersions?: Access;
    update?: Access;
    delete?: Access;
    admin?: (args?: any) => boolean | Promise<boolean>;
    unlock?: Access;
  };
  /**
   * Collection login options
   *
   * Use `true` to enable with default options
   */
  auth?: IncomingAuthType | boolean;
  /**
   * Customize the handling of incoming file uploads
   *
   * @default false // disable uploads
   */
  upload?: IncomingUploadType | boolean;
  /**
   * Customize the handling of incoming file uploads
   *
   * @default false // disable versioning
   */
  versions?: IncomingCollectionVersions | boolean;
  /**
   * Add `createdAt` and `updatedAt` fields
   *
   * @default true
   */
  timestamps?: boolean
};

export interface SanitizedCollectionConfig extends Omit<DeepRequired<CollectionConfig>, 'auth' | 'upload' | 'fields' | 'versions'> {
  auth: Auth;
  upload: Upload;
  fields: Field[];
  versions: SanitizedCollectionVersions
}

export type Collection = {
  Model: CollectionModel;
  config: SanitizedCollectionConfig;
  graphQL?: {
    type: GraphQLObjectType
    JWT: GraphQLObjectType
    versionType: GraphQLObjectType
    whereInputType: GraphQLInputObjectType
    mutationInputType: GraphQLNonNull<any>
    updateMutationInputType: GraphQLNonNull<any>
  }
};

export type AuthCollection = {
  Model: AuthCollectionModel;
  config: SanitizedCollectionConfig;
}

export type TypeWithID = {
  id: string | number
}

export type TypeWithTimestamps = {
  id: string | number
  createdAt: string
  updatedAt: string
  [key: string]: unknown
}
