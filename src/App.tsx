import { useRef } from 'react'
import './App.css'
import { EditorProvider } from './SyncingEditor'

const App = () => {
  const oneRef = useRef<any>(null)

  return (
    <div className="webapp-container">
      <h2 style={{ marginBottom: 12 }}>See below:</h2>
      <button
        onClick={() => {
          console.log(oneRef.current)
          oneRef.current.editor.apply({
            type: 'insert_text',
            path: [0, 0],
            offset: 0,
            text: '1',
          })
        }}
      >
        see what happend
      </button>
      <EditorProvider ref={oneRef} />
      <hr
        style={{
          margin: '8px 0',
          backgroundColor: '#eee',
        }}
      />
      <EditorProvider />
      <hr
        style={{
          margin: '8px 0',
          backgroundColor: '#eee',
        }}
      />
    </div>
  )
}

export default App
