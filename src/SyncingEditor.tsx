import React, { useImperativeHandle, useMemo, useState } from 'react'
import { createEditor, Operation } from 'slate'
import { withReact, Slate, Editable } from 'slate-react'
import { withHistory } from 'slate-history'

import { initialValue } from './constants'
interface IProps {
  placeholder?: string
}

type TCustomOperation = Operation & { source: string }

const SyncingEditor: React.FC<IProps> = (
  { placeholder = 'Please input here...' },
  ref
) => {
  const [val, setVal] = useState(initialValue)
  const editor = useMemo(
    () => withHistory(withReact(createEditor() as any)),
    []
  )

  useImperativeHandle(ref, () => ({
    editor,
  }))

  return (
    <div
      style={{
        background: '#eee',
        minHeight: '5em',
        padding: '.6em',
      }}
    >
      <Slate
        editor={editor}
        value={val}
        onChange={(newval: any) => {
          setVal(newval)
          if (editor.operations.length > 0) {
            const op: TCustomOperation = {
              ...editor.operations[0],
            }
            // emitter.emit(String(editorKey), op)
          }
        }}
      >
        <Editable placeholder={placeholder} />
      </Slate>
    </div>
  )
}

export const EditorProvider = React.forwardRef<any, IProps>(
  SyncingEditor as any
)
