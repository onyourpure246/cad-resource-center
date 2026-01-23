"use client"

import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import {
    FORMAT_ELEMENT_COMMAND,
    FORMAT_TEXT_COMMAND,
    REDO_COMMAND,
    UNDO_COMMAND,
    ElementFormatType
} from "lexical"
import {
    Bold,
    Italic,
    Underline,
    AlignLeft,
    AlignCenter,
    AlignRight,
    List,
    ListOrdered,
    RotateCcw,
    RotateCw,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { INSERT_ORDERED_LIST_COMMAND, INSERT_UNORDERED_LIST_COMMAND } from "@lexical/list"

export function ToolbarPlugin() {
    const [editor] = useLexicalComposerContext()

    const formatText = (format: "bold" | "italic" | "underline") => {
        editor.dispatchCommand(FORMAT_TEXT_COMMAND, format)
    }

    const formatElement = (format: ElementFormatType) => {
        editor.dispatchCommand(FORMAT_ELEMENT_COMMAND, format)
    }

    return (
        <div className="flex flex-wrap items-center gap-1 border-b p-2">
            <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => editor.dispatchCommand(UNDO_COMMAND, undefined)}
                title="Undo"
            >
                <RotateCcw className="h-4 w-4" />
            </Button>
            <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => editor.dispatchCommand(REDO_COMMAND, undefined)}
                title="Redo"
            >
                <RotateCw className="h-4 w-4" />
            </Button>

            <div className="w-px h-6 bg-border mx-1" />

            <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => formatText("bold")}
                title="Bold"
            >
                <Bold className="h-4 w-4" />
            </Button>
            <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => formatText("italic")}
                title="Italic"
            >
                <Italic className="h-4 w-4" />
            </Button>
            <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => formatText("underline")}
                title="Underline"
            >
                <Underline className="h-4 w-4" />
            </Button>

            <div className="w-px h-6 bg-border mx-1" />

            <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => formatElement("left")}
                title="Align Left"
            >
                <AlignLeft className="h-4 w-4" />
            </Button>
            <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => formatElement("center")}
                title="Align Center"
            >
                <AlignCenter className="h-4 w-4" />
            </Button>
            <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => formatElement("right")}
                title="Align Right"
            >
                <AlignRight className="h-4 w-4" />
            </Button>

            <div className="w-px h-6 bg-border mx-1" />

            <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => editor.dispatchCommand(INSERT_UNORDERED_LIST_COMMAND, undefined)}
                title="Bullet List"
            >
                <List className="h-4 w-4" />
            </Button>
            <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => editor.dispatchCommand(INSERT_ORDERED_LIST_COMMAND, undefined)}
                title="Numbered List"
            >
                <ListOrdered className="h-4 w-4" />
            </Button>
        </div>
    )
}
