export * from './models';
export * from './api';
export * from './components';

import { State } from "./common"; // Keeping State import as it might be used here loosely or if removed it breaks something local if any.
// Actually, no local code here anymore.

export type BulkItem = {
    id: number;
    type: 'folder' | 'file';
    name: string;
}
