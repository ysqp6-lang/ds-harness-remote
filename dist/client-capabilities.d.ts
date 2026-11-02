import { RemoteClientCore } from '@dsh-remote/client-core';
import type { RemoteHostFeatures } from './client-runtime-contract.js';
/** Conservative feature profile for Hosts that predate fine-grained capability discovery. */
export declare function remoteHostFeatures(clientVersion?: string): RemoteHostFeatures;
export declare function probeRemoteHostFeatures(client: RemoteClientCore, clientVersion?: string): Promise<RemoteHostFeatures>;
//# sourceMappingURL=client-capabilities.d.ts.map