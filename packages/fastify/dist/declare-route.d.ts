import type { ZodTypeProvider } from '@fastify/type-provider-zod';
import type { FastifyInstance, FastifyReply, FastifyRequest, RouteShorthandOptions } from 'fastify';
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
    metadata?: {
        tags?: string[];
        permission?: string;
    };
};
type AnyContractEndpoint = ContractEndpoint | (Record<string, any> & Pick<ContractEndpoint, 'method'>);
type ZodServer = FastifyInstance<any, any, any, any, ZodTypeProvider>;
export type PermissionChecker = (permission: string) => (req: FastifyRequest, reply: FastifyReply) => Promise<void>;
/**
 * Configure le checker de permissions utilisé par `declareRoute`.
 * À appeler une seule fois au démarrage de l'application.
 *
 * @example
 * configurePermissionChecker(requirePermission);
 */
export declare function configurePermissionChecker(checker: PermissionChecker): void;
/**
 * Enregistre une route Fastify à partir d'un endpoint de contrat ts-rest.
 * Mappe automatiquement `method`, `path`, `body`, `pathParams` et `responses`.
 * Si `contract.metadata.permission` est défini et qu'un checker a été configuré
 * via `configurePermissionChecker`, un preHandler de permission est injecté automatiquement.
 *
 * @example
 * declareRoute(server, inventoryContract.getAll, ctrl.getAll.bind(ctrl));
 */
export declare function declareRoute(server: ZodServer, contract: AnyContractEndpoint, handler: (req: FastifyRequest<any>, reply: FastifyReply) => void | Promise<any>, options?: Omit<RouteShorthandOptions, 'schema'>): void;
export {};
//# sourceMappingURL=declare-route.d.ts.map