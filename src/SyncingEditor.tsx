import React, { useImperativeHandle, useMemo, useRef, useState } from 'react'
import { createEditor } from 'slate'
import { withReact, Slate, Editable } from 'slate-react'
import { withHistory } from 'slate-history'
// import Mitt from 'mitt'

import { initialValue } from './constants'
interface IProps {
  placeholder?: string
}

// const emiiter = Mitt()

const SyncingEditor: React.FC<IProps> = (
  { placeholder = 'Please input here...' },
  ref
) => {
  const [val, setVal] = useState(initialValue)
  const editor = useMemo(
    () => withHistory(withReact(createEditor() as any)),
    []
  )
  const id = useRef(Date.now())

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
        key={id.current}
        editor={editor}
        value={val}
        onChange={(newval: any) => {
          console.log(editor.operations)
          setVal(newval)
        }}
      >
        <Editable placeholder={placeholder} />
      </Slate>
    </div>
  )
}

export const EditorProvider = React.forwardRef(SyncingEditor as any)
