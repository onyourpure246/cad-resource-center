import React from 'react';
import { Folder, FolderOpen, ChevronRight, Check, Loader2 } from "lucide-react";
import { FolderTreeProps } from '@/types/MoveDialog.types';

export const FolderTree = ({ nodes, selectedFolderId, itemId, itemType, onToggle, onSelect, level = 0 }: FolderTreeProps) => {
    // Only show folders, not files (though logic might handle this upstream, good to be safe if reused)
    // Assuming nodes are only folders based on useMoveDialog logic

    return (
        <>
            {nodes.map(node => {
                const isSelected = selectedFolderId === node.id;
                // Fix: Only disable if we are moving a FOLDER and the ID matches.
                // If we are moving a FILE, it cannot be a folder node, so no collision check needed.
                const isDisabled = itemType === 'folder' && node.id === itemId;
                const hasChildren = node.children && node.children.length > 0;
                // If hasLoaded is false, we assume it MIGHT have children, so show chevron. 
                // If loaded and no children, no chevron.
                const showChevron = !node.hasLoaded || hasChildren;

                return (
                    <div key={node.id}>
                        <div
                            className={`
                                group flex items-center py-2 pr-2 rounded-md cursor-pointer transition-colors px-2
                                ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}
                                ${isSelected
                                    ? 'bg-primary/10 text-primary font-medium'
                                    : isDisabled
                                        ? ''
                                        : 'hover:bg-muted/60 text-foreground'
                                }
                            `}
                            style={{
                                paddingLeft: `${(level * 12) + 8}px` // Reduced indent slightly for tighter tree
                            }}
                            onClick={() => {
                                if (!isDisabled) {
                                    onSelect(node.id);
                                }
                            }}
                        >
                            {/* Chevron Toggle */}
                            <div
                                className={`
                                    flex items-center justify-center h-6 w-6 mr-1 rounded-sm transition-colors
                                    ${!showChevron ? 'invisible' : ''}
                                    ${!isDisabled && 'hover:bg-muted/80'}
                                `}
                                onClick={(e) => {
                                    if (!isDisabled) {
                                        e.stopPropagation();
                                        onToggle(node, e);
                                    }
                                }}
                            >
                                {node.isLoading ? (
                                    <Loader2 className="h-3 w-3 animate-spin text-muted-foreground" />
                                ) : (
                                    <ChevronRight
                                        className={`h-4 w-4 text-muted-foreground transition-transform duration-200 ${node.isOpen ? 'rotate-90' : ''}`}
                                    />
                                )}
                            </div>

                            {/* Folder Icon */}
                            {node.isOpen ? (
                                <FolderOpen className={`h-5 w-5 mr-3 transition-colors ${isSelected ? 'text-primary fill-primary/20' : 'text-blue-500'}`} />
                            ) : (
                                <Folder className={`h-5 w-5 mr-3 transition-colors ${isSelected ? 'text-primary fill-primary/20' : 'text-blue-500'}`} />
                            )}

                            {/* Folder Name */}
                            <span className="flex-1 text-sm truncate select-none">
                                {node.name}
                            </span>

                            {/* Selection Indicator */}
                            {isSelected && (
                                <Check className="h-4 w-4 text-primary flex-shrink-0 animate-in zoom-in spin-in-50 duration-300" />
                            )}
                        </div>

                        {/* Recursive Children */}
                        {node.isOpen && node.children && (
                            <div className="animate-in slide-in-from-top-1 duration-200 fade-in-0">
                                <FolderTree
                                    nodes={node.children}
                                    selectedFolderId={selectedFolderId}
                                    itemId={itemId}
                                    itemType={itemType}
                                    onToggle={onToggle}
                                    onSelect={onSelect}
                                    level={level + 1}
                                />
                            </div>
                        )}
                    </div>
                );
            })}
        </>
    );
};
