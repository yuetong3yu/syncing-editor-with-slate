import { useEffect, useRef } from 'react'
import './App.css'
import { EditorProvider } from './SyncingEditor'
import Mitt, { Emitter } from 'mitt'
import { Operation } from 'slate'

export const emitter = Mitt()

const App = () => {
  return (
    <div className="webapp-container">
      <h2 style={{ marginBottom: 12 }}>See below:</h2>
      <EditorProvider />
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
