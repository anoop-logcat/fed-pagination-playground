import { getDirective, MapperKind, mapSchema } from "@graphql-tools/utils";
import { defaultFieldResolver, GraphQLError, GraphQLSchema } from "graphql";

const serviceAdminDirectiveArgumentMaps: Record<string, any> = {};

export const authDirectiveTransformer = (schema: GraphQLSchema) =>
  mapSchema(schema, {
    [MapperKind.TYPE]: (type) => {
      const serviceAdminDirective = getDirective(schema, type, "serviceAdmin")?.[0];
      if (serviceAdminDirective) serviceAdminDirectiveArgumentMaps[type.name] = serviceAdminDirective;
      return undefined;
    },
    [MapperKind.OBJECT_FIELD]: (fieldConfig, _fieldName, typeName) => {
      const serviceAdminDirective = getDirective(schema, fieldConfig, "serviceAdmin")?.[0] ?? serviceAdminDirectiveArgumentMaps[typeName];
      if (serviceAdminDirective) {
        const { resolve = defaultFieldResolver } = fieldConfig;
        fieldConfig.resolve = function (source, args, context, info) {
          if (context.serviceAdmin) return resolve(source, args, context, info);
          throw new GraphQLError("invalid service token");
        };
        return fieldConfig;
      }
    },
  });
