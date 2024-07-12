import { useState } from 'react'
import Avatar, { genConfig } from 'react-nice-avatar'

function InfoAvatarSelect() {
  const [config, setConfig] = useState(genConfig());

  return (
    <div>
      <Avatar {...config} />
      <button onClick={() => setConfig(genConfig())}>Random</button>
    </div>
  )
}