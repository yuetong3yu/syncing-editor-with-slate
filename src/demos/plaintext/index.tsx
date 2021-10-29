import { useState, useMemo } from 'react'
import { Editable, Slate, withReact } from 'slate-react'
import { Descendant, createEditor } from 'slate'
import { withHistory } from 'slate-history'

const initialValue: any[] = [
  {
    type: 'p',
    children: [
      { text: 'This is editable plain text, just like a <textarea>!' },
    ],
  },
]

export const Plaintext = () => {
  const [val, setVal] = useState<Descendant[]>(initialValue)
  const editor = useMemo(
    () => withHistory(withReact(createEditor() as any)),
    []
  )

  return (
    <Slate editor={editor} value={val} onChange={(newval) => setVal(newval)}>
      <Editable />
    </Slate>
  )
}
