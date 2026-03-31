"use client"

import {
  InitialConfigType,
  LexicalComposer,
} from "@lexical/react/LexicalComposer"
import { OnChangePlugin } from "@lexical/react/LexicalOnChangePlugin"
import { EditorState, SerializedEditorState } from "lexical"
import { $generateHtmlFromNodes, $generateNodesFromDOM } from "@lexical/html"
import * as React from "react"
import { useLexicalComposerContext } from "@lexical/react/LexicalComposerContext"
import { $getRoot } from "lexical"

import { editorTheme } from "@/components/editor/themes/editor-theme"
import { TooltipProvider } from "@/components/ui/tooltip"

import { nodes } from "./nodes"
import { Plugins } from "./plugins"

const editorConfig: InitialConfigType = {
  namespace: "Editor",
  theme: editorTheme,
  nodes,
  onError: (error: Error) => {
    console.error(error)
  },
}

export function Editor({
  editorState,
  editorSerializedState,
  onChange,
  onSerializedChange,
  onChangeHtml,
  initialHtml,
}: {
  editorState?: EditorState
  editorSerializedState?: SerializedEditorState
  onChange?: (editorState: EditorState) => void
  onSerializedChange?: (editorSerializedState: SerializedEditorState) => void
  onChangeHtml?: (html: string) => void
  initialHtml?: string
}) {
  return (
    <div className="bg-background overflow-hidden rounded-lg border shadow font-sarabun">
      <LexicalComposer
        initialConfig={{
          ...editorConfig,
          ...(editorState ? { editorState } : {}),
          ...(editorSerializedState
            ? { editorState: JSON.stringify(editorSerializedState) }
            : {}),
        }}
      >
        <TooltipProvider>
          <Plugins />

          <OnChangePlugin
            ignoreSelectionChange={true}
            onChange={(editorState, editor) => {
              onChange?.(editorState)
              onSerializedChange?.(editorState.toJSON())

              if (onChangeHtml) {
                editorState.read(() => {
                  const html = $generateHtmlFromNodes(editor, null);
                  onChangeHtml(html);
                });
              }
            }}
          />
          {initialHtml && <LoadHtmlPlugin html={initialHtml} />}
        </TooltipProvider>
      </LexicalComposer>
    </div>
  )
}

function LoadHtmlPlugin({ html }: { html: string }) {
  const [isLoaded, setIsLoaded] = React.useState(false);
  const [editor] = useLexicalComposerContext();

  React.useEffect(() => {
    if (!isLoaded && html) {
      editor.update(() => {
        const parser = new DOMParser();
        const dom = parser.parseFromString(html, 'text/html');
        const nodes = $generateNodesFromDOM(editor, dom);
        // Select the root
        const root = $getRoot();
        root.clear();
        root.append(...nodes);
      });
      setIsLoaded(true);
    }
  }, [editor, html, isLoaded]);

  return null;
}
