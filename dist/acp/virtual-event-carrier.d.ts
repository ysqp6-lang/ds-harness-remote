import type { ApiProxy, RpcRequest } from '@deepseek-ai/dsh-host-apiproxy/api';
import type { TypertRpcResult } from '../typert-gateway-contract.js';
import type { AcpVirtualWorkspaceView } from './virtual-catalog.js';
import type { AcpClientLike, AcpSessionState, JsonRecord, PendingApproval } from './virtual-contract.js';
import { AsyncValueQueue } from './virtual-contract.js';
/** Collaborates with one AcpVirtualHarness; never creates a second session or connection state. */
export interface AcpEventCarrierContext {
    readonly workspaceStreams: Set<AsyncValueQueue>;
    readonly visibleWorkspaces: () => AcpVirtualWorkspaceView[];
    readonly controlStreams: Set<AsyncValueQueue>;
    readonly eventStreams: Map<string, AsyncValueQueue>;
    readonly selectedWorkspaceId: string | undefined;
    readonly workspaceById: Map<string, AcpVirtualWorkspaceView>;
    readonly backendLabel: () => string;
    readonly pendingApprovals: Map<string, PendingApproval>;
    readonly client: AcpClientLike;
    readonly dispatch: (endpoint: string, payload: unknown, signal: AbortSignal) => Promise<TypertRpcResult>;
    readonly rcMuxStreams: Set<AsyncValueQueue>;
    readonly sessions: Map<string, AcpSessionState>;
    readonly rcHostStreams: Set<AsyncValueQueue>;
    readonly nextProjectionSeq: () => number;
    readonly archivedSessionIds: ReadonlySet<string>;
}
export declare class AcpEventCarrier {
    private readonly context;
    constructor(context: AcpEventCarrierContext);
    workspaceFollow(signal: AbortSignal): Promise<AsyncIterable<unknown>>;
    sessionControl(signal: AbortSignal): Promise<AsyncIterable<unknown>>;
    /**
     * Background jobs belong to the Host Harness session, not to a backend-scoped
     * virtual Workspace. The native session header mounts a job roster stream as
     * soon as a Session opens, so answer it with an authoritative empty roster
     * instead of a terminal `method-not-found` failure that tears the page down.
     */
    emptyJobStream(endpoint: 'job/list' | 'job/follow', signal: AbortSignal): AsyncIterable<unknown>;
    remoteEvents(signal: AbortSignal): Promise<AsyncIterable<unknown>>;
    emitRemoteEvent(event: string, args: unknown[]): void;
    emitApproval(input: {
        eventId: string;
        agentId: string;
        request: JsonRecord;
    }): void;
    answerRemoteEvent(args: JsonRecord, signal: AbortSignal): Promise<undefined>;
    createApiProxy(): ApiProxy;
    rcMux(request: RpcRequest<unknown>, signal: AbortSignal): AsyncIterable<unknown>;
    rcHost(_request: RpcRequest<unknown>, signal: AbortSignal): AsyncIterable<unknown>;
    broadcastRcMux(payload: unknown, rpcId?: string): void;
    broadcastRcHost(payload: unknown): void;
    publishProjection(sessionId: string, key: string, value: unknown, seq?: number): void;
}
//# sourceMappingURL=virtual-event-carrier.d.ts.map