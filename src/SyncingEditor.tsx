import React, { useEffect, useMemo, useRef, useState } from 'react'
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
const syncingOperations = ['insert_text', 'remove_text']

export const SyncingEditor: React.FC<IProps> = ({
  placeholder = 'Please input here...',
}) => {
  const [val, setVal] = useState(initialValue)
  const editor = useMemo(
    () => withHistory(withReact(createEditor() as any)),
    []
  )
  const id = useRef(Date.now())
  const lastOperationRef = useRef<string | null>(null)

  useEffect(() => {
    ;(emitter as any).on('*', (type: string, op: any) => {
      if (type !== String(id.current)) {
        if (syncingOperations.includes(op.type)) {
          const operationTag = `${op.type}_${op.text}_${op.path.join(',')}`
          if (operationTag !== lastOperationRef.current) {
            console.log('123 recevice', operationTag)
            editor.apply(op)
            lastOperationRef.current = operationTag
          }
        }
      }
    })
  })

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
          console.log('change', newval)
          setVal(newval)
          if (editor.operations.length > 0) {
            const op: TCustomOperation = {
              ...editor.operations[0],
              sourcer: true,
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
