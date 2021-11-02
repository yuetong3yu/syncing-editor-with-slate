import './App.css'
import { SyncingEditor } from './SyncingEditor'

const App = () => {
  return (
    <div className="webapp-container">
      <h2 style={{ marginBottom: 12 }}>See below:</h2>
      <SyncingEditor />
      <hr
        style={{
          margin: '8px 0',
          backgroundColor: '#eee',
        }}
      />
      <SyncingEditor />
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
