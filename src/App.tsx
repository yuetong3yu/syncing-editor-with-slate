import { useState } from 'react'
import './App.css'
import { SyncingEditor } from './SyncingEditor'

const App = () => {
  const [applyingId, setApplyingId] = useState<string>('')

  return (
    <div className="webapp-container">
      <h2 style={{ marginBottom: 12 }}>Syncing Editors:</h2>
      <SyncingEditor applyingId={applyingId} setApplyingId={setApplyingId} />
      <hr
        style={{
          margin: '8px 0',
          backgroundColor: '#eee',
        }}
      />
      <SyncingEditor applyingId={applyingId} setApplyingId={setApplyingId} />
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
