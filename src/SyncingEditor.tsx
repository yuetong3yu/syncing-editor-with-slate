import { useEffect, useMemo, useState } from 'react'
import { createEditor } from 'slate'
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

  useEffect(() => {
    mitt.on('*', () => {
      console.log('123 listen...')
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
          console.log('123 ops', ops)
          if (ops.length) {
            mitt.emit('change', ops)
          }
          setVal(newval)
        }}
      >
        <Editable placeholder={placeholder} />
      </Slate>
    </div>
  )
}
