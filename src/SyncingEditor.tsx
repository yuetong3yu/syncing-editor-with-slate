import React, { useEffect, useMemo, useRef, useState } from 'react'
import { createEditor, Operation } from 'slate'
import { withReact, Slate, Editable } from 'slate-react'
import { withHistory } from 'slate-history'
import Mitt from 'mitt'

import { initialValue } from './constants'
interface IProps {
  placeholder?: string
  applyingId: string
  setApplyingId: any
}

type TCustomOperation = Operation

const emitter = Mitt()
const syncingOperations = ['insert_text', 'remove_text']

export const SyncingEditor: React.FC<IProps> = ({
  placeholder = 'Please input here...',
  applyingId,
  setApplyingId,
}) => {
  const [val, setVal] = useState(initialValue)
  const editor = useMemo(
    () => withHistory(withReact(createEditor() as any)),
    []
  )
  const id = useRef(`${Date.now()}`)
  const remote = useRef(false)

  useEffect(() => {
    ;(emitter as any).on('*', (type: string, op: any) => {
      if (type !== String(id.current)) {
        editor.apply(op)
        setApplyingId(id.current)
      }
    })
  }, [])

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
          const op: TCustomOperation = editor.operations[0]
          if (
            editor.operations.length > 0 &&
            applyingId !== id.current &&
            syncingOperations.includes(op.type)
          ) {
            setApplyingId(id.current)
            emitter.emit(String(id.current), op)
          }
        }}
      >
        <Editable placeholder={placeholder} />
      </Slate>
    </div>
  )
}
