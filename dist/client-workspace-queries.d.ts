import { RemoteClientCore } from '@dsh-remote/client-core';
import type { RemoteWorkspaceView } from './client-runtime-contract.js';
import { RemoteTypertGateway } from './remote-typert-gateway.js';
import type { TypertGatewayLike } from './typert-gateway-contract.js';
export declare function invokeRemoteCommand(client: RemoteClientCore, request: Parameters<TypertGatewayLike['invoke']>[0]): Promise<unknown>;
export declare function readRemoteWorkspaceBaseline(gateway: RemoteTypertGateway, signal?: AbortSignal): Promise<RemoteWorkspaceView[]>;
export declare function unwrapNativeResult<T>(response: {
    result: unknown;
}): T;
export declare function workspaceRecordId(value: unknown): string;
export declare function remoteWorkspaceTitle(path: string): string;
//# sourceMappingURL=client-workspace-queries.d.ts.map