import type { ZodTypeProvider } from '@fastify/type-provider-zod';
import type {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
  RouteShorthandOptions,
} from 'fastify';
import type { ZodType } from 'zod';
import type { HttpMethod } from './http-method';

export type ContractEndpoint = {
  method: HttpMethod;
  path: string;
  body?: ZodType | symbol;
  pathParams?: ZodType;
  responses: Record<number, ZodType>;
  summary?: string;
  description?: string;
  metadata?: { tags?: string[]; permission?: string };
};

// ts-rest 3.x + Zod v4 : l'inférence de type perd path/responses comme propriétés
// explicites. Ce type accepte les deux formes.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyContractEndpoint = ContractEndpoint | (Record<string, any> & Pick<ContractEndpoint, 'method'>);

type ZodServer = FastifyInstance<any, any, any, any, ZodTypeProvider>;

export type PermissionChecker = (permission: string) => (req: FastifyRequest, reply: FastifyReply) => Promise<void>;

let _permissionChecker: PermissionChecker | undefined;

/**
 * Configure le checker de permissions utilisé par `declareRoute`.
 * À appeler une seule fois au démarrage de l'application.
 *
 * @example
 * configurePermissionChecker(requirePermission);
 */
export function configurePermissionChecker(checker: PermissionChecker): void {
  _permissionChecker = checker;
}

/**
 * Enregistre une route Fastify à partir d'un endpoint de contrat ts-rest.
 * Mappe automatiquement `method`, `path`, `body`, `pathParams` et `responses`.
 * Si `contract.metadata.permission` est défini et qu'un checker a été configuré
 * via `configurePermissionChecker`, un preHandler de permission est injecté automatiquement.
 *
 * @example
 * declareRoute(server, inventoryContract.getAll, ctrl.getAll.bind(ctrl));
 */
export function declareRoute(
  server: ZodServer,
  contract: AnyContractEndpoint,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handler: (req: FastifyRequest<any>, reply: FastifyReply) => void | Promise<any>,
  options?: Omit<RouteShorthandOptions, 'schema'>,
): void {
  const method = contract.method.toLowerCase() as Lowercase<HttpMethod>;

  const schema: Record<string, unknown> = { response: contract.responses };
  if (contract.body && typeof contract.body !== 'symbol') schema.body = contract.body;
  if (contract.pathParams) schema.params = contract.pathParams;
  if (contract.summary) schema.summary = contract.summary;
  if (contract.description) schema.description = contract.description;
  if (contract.metadata?.tags) schema.tags = contract.metadata.tags;

  const permission = contract.metadata?.permission;
  const resolvedOptions: Omit<RouteShorthandOptions, 'schema'> =
    permission && _permissionChecker && !options?.preHandler
      ? { preHandler: _permissionChecker(permission), ...options }
      : { ...options };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (server[method] as any)(contract.path, { ...resolvedOptions, schema }, handler);
}
