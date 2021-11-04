import React, { useMemo, useRef, useState } from 'react'
import { createEditor, Operation } from 'slate'
import { withReact, Slate, Editable } from 'slate-react'
import { withHistory } from 'slate-history'
import Mitt from 'mitt'

import { initialValue } from './constants'
interface IProps {
  placeholder?: string
}

type TCustomOperation = Operation & { source: string }

const emitter = Mitt()

export const SyncingEditor: React.FC<IProps> = ({
  placeholder = 'Please input here...',
}) => {
  const [val, setVal] = useState(initialValue)
  const editor = useMemo(
    () => withHistory(withReact(createEditor() as any)),
    []
  )
  const id = useRef(Date.now())

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
            emitter.emit(String(id.current), op)
          }
        }}
      >
        <Editable placeholder={placeholder} />
      </Slate>
    </div>
  )
}
