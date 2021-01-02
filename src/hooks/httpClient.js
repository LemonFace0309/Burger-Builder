import { useState, useEffect } from 'react'

const useHttpErrorHandler = httpClient => {
  const [error, setError] = useState(null)

    const reqIntercetor = httpClient.interceptors.request.use((req) => {
      setError(null)
      return req
    })

    const resIntercetor = httpClient.interceptors.response.use(
      (res) => res,
      (err) => {
        setError(err)
      },
    )

    useEffect(() => {
      return () => {
        httpClient.interceptors.request.eject(reqIntercetor)
        httpClient.interceptors.response.eject(resIntercetor)
      }
    }, [httpClient, reqIntercetor, resIntercetor])
    // Prevents memory leaks from storing lots of useless interceptors created from componentDidMount()

    const errorConfirmedHandler = () => {
      setError(null)
    }

    return [error, errorConfirmedHandler]
}

export default useHttpErrorHandler
