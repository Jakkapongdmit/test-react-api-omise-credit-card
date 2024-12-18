import { useMemo, useState, useEffect, createContext } from 'react'
export const ClientContext = createContext({})

export function ClientProvider({ children }) {
  const client = useMemo(() => window.ZAFClient.init(), [])
  const [appRegistered, setAppRegistered] = useState(false)

  useEffect(() => {
    client.on('app.registered', function () {
      setAppRegistered(true)
      
      client.invoke('resize', { width: '100%', height: '600px' });
    })
  }, [client])

  if (!appRegistered) return null

  return <ClientContext.Provider value={client}>{children}</ClientContext.Provider>
}
