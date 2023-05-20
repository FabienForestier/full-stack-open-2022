import { useEffect, useState } from 'react'
import apiService from '../api.service'

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  useEffect(() => { 
    apiService.getAll(baseUrl).then((resources) => { setResources(resources)})
  }, [baseUrl])

  const create = (resourceBody) => {
    apiService.create(baseUrl, resourceBody).then((res) => {
      setResources([...resources, res.data])
      return res.data;
    })
  }

  const service = {
    create
  }

  return [
    resources, service
  ]
}

export default useResource