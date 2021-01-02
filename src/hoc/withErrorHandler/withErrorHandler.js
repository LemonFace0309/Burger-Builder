import React, { useState, useEffect } from 'react'

import Modal from '../../components/UI/Modal/Modal'
import Aux from '../Auxiliary/Auxiliary'

const withErrorHandler = (WrappedComponent, axios) => {
  return (props) => {
    const [error, setError] = useState(null)

    const reqIntercetor = axios.interceptors.request.use((req) => {
      setError(null)
      return req
    })

    const resIntercetor = axios.interceptors.response.use(
      (res) => res,
      (err) => {
        setError(err)
      },
    )

    useEffect(() => {
      return () => {
        axios.interceptors.request.eject(reqIntercetor)
        axios.interceptors.response.eject(resIntercetor)
      }
    }, [reqIntercetor, resIntercetor])
    // Prevents memory leaks from storing lots of useless interceptors created from componentDidMount()

    const errorConfirmedHandler = () => {
      setError(null)
    }

    return (
      <Aux>
        <Modal show={error} modalClosed={errorConfirmedHandler}>
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </Aux>
    )
  }
}

export default withErrorHandler
