import React from 'react';
import { Folder, ChevronRight, ChevronDown, Check, Loader2 } from "lucide-react";
import { FolderTreeProps } from '../../../types/MoveDialog.types';

export const FolderTree = ({ nodes, selectedFolderId, itemId, onToggle, onSelect, level = 0 }: FolderTreeProps) => {
    return (
        <>
            {nodes.map(node => (
                <div key={node.id}>
                    <div
                        className={`flex items-center p-2 rounded-md cursor-pointer hover:bg-accent ${selectedFolderId === node.id ? 'bg-accent' : ''}`}
                        style={{ paddingLeft: `${(level * 16) + 8}px` }}
                        onClick={() => {
                            if (node.id !== itemId) {
                                onSelect(node.id);
                            }
                        }}
                    >
                        <div
                            className="p-1 mr-1 hover:bg-muted rounded-sm cursor-pointer"
                            onClick={(e) => onToggle(node, e)}
                        >
                            {node.isLoading ? (
                                <Loader2 className="h-3 w-3 animate-spin" />
                            ) : (
                                // Only show chevron if it's not the item itself (can't move into itself) 
                                // AND (it has children OR we haven't loaded yet so it MIGHT have children)
                                // Actually, even if we loaded and it has no children, we might want to show empty state or no chevron.
                                // If hasLoaded is true and children is empty, no chevron.
                                (node.id !== itemId) && (!node.hasLoaded || (node.children && node.children.length > 0)) ? (
                                    node.isOpen ? <ChevronDown className="h-3 w-3" /> : <ChevronRight className="h-3 w-3" />
                                ) : (
                                    <div className="w-3 h-3" /> // Spacer
                                )
                            )}
                        </div>

                        <Folder className={`h-4 w-4 mr-2 ${node.id === itemId ? 'text-muted-foreground/50' : 'text-blue-500'}`} />
                        <span className={`flex-1 text-sm truncate ${node.id === itemId ? 'text-muted-foreground line-through' : ''}`}>
                            {node.name}
                        </span>
                        {selectedFolderId === node.id && <Check className="h-4 w-4 text-primary ml-2" />}
                    </div>
                    {node.isOpen && node.children && (
                        <div>
                            <FolderTree
                                nodes={node.children}
                                selectedFolderId={selectedFolderId}
                                itemId={itemId}
                                onToggle={onToggle}
                                onSelect={onSelect}
                                level={level + 1}
                            />
                        </div>
                    )}
                </div>
            ))}
        </>
    );
};
