import { useMemo, useState } from 'react'
import { createEditor } from 'slate'
import { withReact, Slate, Editable } from 'slate-react'
import { withHistory } from 'slate-history'

import { initialValue } from './constants'

export const SyncingEditor = () => {
  const [val, setVal] = useState(initialValue)
  const editor = useMemo(
    () => withHistory(withReact(createEditor() as any)),
    []
  )

  return (
    <Slate
      editor={editor}
      value={val}
      onChange={(newval: any) => setVal(newval)}
    >
      <Editable />
    </Slate>
  )
}
