export * from './models';
export * from './api';
export * from './components';



export type BulkItem = {
    id: number;
    type: 'folder' | 'file';
    name: string;
}
