"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configurePermissionChecker = configurePermissionChecker;
exports.declareRoute = declareRoute;
let _permissionChecker;
/**
 * Configure le checker de permissions utilisé par `declareRoute`.
 * À appeler une seule fois au démarrage de l'application.
 *
 * @example
 * configurePermissionChecker(requirePermission);
 */
function configurePermissionChecker(checker) {
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
function declareRoute(server, contract, 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
handler, options) {
    const method = contract.method.toLowerCase();
    const schema = { response: contract.responses };
    if (contract.body && typeof contract.body !== 'symbol')
        schema.body = contract.body;
    if (contract.pathParams)
        schema.params = contract.pathParams;
    if (contract.summary)
        schema.summary = contract.summary;
    if (contract.description)
        schema.description = contract.description;
    if (contract.metadata?.tags)
        schema.tags = contract.metadata.tags;
    const permission = contract.metadata?.permission;
    const resolvedOptions = permission && _permissionChecker && !options?.preHandler
        ? { preHandler: _permissionChecker(permission), ...options }
        : { ...options };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    server[method](contract.path, { ...resolvedOptions, schema }, handler);
}
