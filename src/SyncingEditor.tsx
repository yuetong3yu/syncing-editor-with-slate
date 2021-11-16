import { useEffect, useMemo, useRef, useState } from 'react'
import { createEditor, Operation } from 'slate'
import { withReact, Slate, Editable } from 'slate-react'
import { withHistory } from 'slate-history'
import Mitt from 'mitt'

import { initialValue } from './constants'
interface IProps {
  placeholder?: string
}

const mitt = Mitt()

export const SyncingEditor: React.FC<IProps> = ({
  placeholder = 'Please input here...',
}) => {
  const [val, setVal] = useState(initialValue)
  const editor = useMemo(
    () => withHistory(withReact(createEditor() as any)),
    []
  )
  const id = useRef(new Date().getTime())
  const isFromRemote = useRef<boolean>(false)

  useEffect(() => {
    ;(mitt as any).on('*', (type: string, val: Operation[]) => {
      if (type !== String(id.current)) {
        isFromRemote.current = true
        val.forEach((op) => editor.apply(op))
        isFromRemote.current = false
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
          const ops = editor.operations
            .filter(
              (i: any) => i.type !== 'set_selection' && i.type !== 'set_value'
            )
            .map((o: any) => ({
              ...o,
              datasource: 'one',
            }))
          if (ops.length) {
            mitt.emit(String(id.current), ops)
          }
          setVal(newval)
        }}
      >
        <Editable placeholder={placeholder} />
      </Slate>
    </div>
  )
}
