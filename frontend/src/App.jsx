import { useState } from 'react'
import BasicInputsTab from './components/BasicInputsTab'
import AxisWidget from './components/AxisWidget'
import bridgeImg from './assets/bridge_section.png'

function App() {
  const [activeTab, setActiveTab] = useState('basic')
  const [gridOn, setGridOn] = useState(false)

  return (
    <div className="app-root">

      <div className="titlebar">
        <div className="titlebar-left">
          <div className="osdag-icon">S</div>
          <span className="app-title">Group Design</span>
        </div>
        <div className="menu-bar">
          <span>File</span>
          <span>Edit</span>
          <span>Graphics</span>
          <span>Help</span>
        </div>
        <div className="win-controls">
          <button className="wc-btn" title="Minimize"><IconMinimize /></button>
          <button className="wc-btn wc-active" title="Restore"><IconRestore /></button>
          <button className="wc-btn" title="Maximize"><IconMaximize /></button>
          <button className="wc-btn wc-close" title="Close"><IconClose /></button>
        </div>
      </div>

      <div className="app-body">
        <div className="left-panel">
          <div className="tab-strip">
            <button
              className={'tab-btn' + (activeTab === 'basic' ? ' tab-active' : '')}
              onClick={() => setActiveTab('basic')}
            >
              Basic Inputs
            </button>
            <button
              className={'tab-btn' + (activeTab === 'additional' ? ' tab-active' : '')}
              onClick={() => setActiveTab('additional')}
            >
              Additional Inputs
            </button>
          </div>

          <div className="tab-body">
            {activeTab === 'basic' && <BasicInputsTab />}
            {activeTab === 'additional' && (
              <p className="tab-empty">Additional inputs not required for this task.</p>
            )}
          </div>
        </div>

        <div className="viewport">
          <button
            className={'grid-btn' + (gridOn ? ' grid-btn-on' : '')}
            onClick={() => setGridOn(v => !v)}
            title="Toggle grid"
          >
            <IconGrid />
          </button>

          <div className="vp-inner">
            {gridOn && <div className="dot-grid" />}
            <div className="bridge-tag">
              Bridge Cross Section &nbsp;(For Nomenclature Only)
            </div>
            <div className="bridge-frame">
              <img
                src={bridgeImg}
                alt="Bridge cross-section"
                className="bridge-img"
                draggable={false}
              />
            </div>
          </div>

          <div className="axis-box">
            <AxisWidget />
          </div>
        </div>
      </div>

    </div>
  )
}

// SVG icons for window controls - no unicode emoji, just clean paths

function IconMinimize() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <rect x="1" y="5.5" width="10" height="1.5" fill="currentColor" rx="0.5" />
    </svg>
  )
}

function IconRestore() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.4">
      <rect x="3" y="1.5" width="7.5" height="7.5" rx="0.5" />
      <polyline points="1.5,4 1.5,10.5 8,10.5" />
    </svg>
  )
}

function IconMaximize() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.4">
      <rect x="1" y="1" width="10" height="10" rx="0.5" />
    </svg>
  )
}

function IconClose() {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <line x1="2" y1="2" x2="10" y2="10" />
      <line x1="10" y1="2" x2="2" y2="10" />
    </svg>
  )
}

function IconGrid() {
  const pos = [1, 7, 13]
  return (
    <svg width="19" height="19" viewBox="0 0 19 19" fill="currentColor">
      {pos.flatMap(r => pos.map(c => (
        <rect key={r + '-' + c} x={c} y={r} width="4" height="4" rx="0.5" />
      )))}
    </svg>
  )
}

export default App
