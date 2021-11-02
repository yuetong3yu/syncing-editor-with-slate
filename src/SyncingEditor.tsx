import { useMemo, useState } from 'react'
import { createEditor } from 'slate'
import { withReact, Slate, Editable } from 'slate-react'
import { withHistory } from 'slate-history'

import { initialValue } from './constants'

interface IProps {
  placeholder?: string
}

export const SyncingEditor: React.FC<IProps> = ({
  placeholder = 'Please input here...',
}) => {
  const [val, setVal] = useState(initialValue)
  const editor = useMemo(
    () => withHistory(withReact(createEditor() as any)),
    []
  )

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
          console.log('123 op', editor.operations)
          setVal(newval)
        }}
      >
        <Editable placeholder={placeholder} />
      </Slate>
    </div>
  )
}
