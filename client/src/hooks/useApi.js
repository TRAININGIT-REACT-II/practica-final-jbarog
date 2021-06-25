import { useMemo, useEffect, useState, useContext } from "react";

import Auth from "contexts/auth";

const API_ENDPOINTS = {
  login: { url: '/api/login',conf:{method:"post"},public:true,captureToken:true},
  register: { url: '/api/register',conf:{method:"post"},public:true,captureToken:true},
  getNotes: { url: '/api/notes'},
  addNote: { url: '/api/notes',conf:{method:"post"}},
}
const useApi = (action, initialParams = {},body = {}) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState(null);
  const auth = useContext(Auth);
  const [error, setError] = useState(null);
  const [performRequest, setPerformRequest] = useState(false);
  const [requestBody, setRequestBody] = useState(body);
  const perform = (body) => {
    if(body)setRequestBody(body)
    setPerformRequest(true);
  };

  const getEndPonit = action => API_ENDPOINTS[action] || null;
  const parseBody = (body,method) => {
    const methodName = (method && method.toUpperCase()) || 'GET'
      switch(methodName) {
      case 'GET':
        return {}
      default:
        return {body:JSON.stringify(body)}
    }
  };
  const config = useMemo(() => {
    const defaultConf = {
      headers:{
        "Content-type": "application/json; charset=UTF-8",
      }
    }
    const endPoint = getEndPonit(action);
    let fetchOptions = {
      ...defaultConf,
      ...endPoint.conf,
      ...initialParams,

    };
    if(requestBody){
      fetchOptions={
        ...fetchOptions,
        ...parseBody(requestBody,fetchOptions.method)
      }
    }
    if (!endPoint.public) {
      if (fetchOptions.headers == null) {
        fetchOptions.headers = {};
      }
      fetchOptions.headers["api-token"] = auth.currentUser.token;
    }

    return {
      url:API_DOMAIN+endPoint.url,
      fetchOptions
    };
  }, [initialParams,body]);
  const parseData = data=>{
    const endPoint = getEndPonit(action);
    setData(data);
    if(endPoint.captureToken){
      auth.updateAuth(data)
    }
  }
  useEffect(() => {
    if (performRequest) {
      if (!loading) {
        setLoading(true);
      }
      setError("");
      fetch(config.url, config.fetchOptions)
      .then((res) => res.json())
      .then((json) => {
        if (json.error != null) {
          setError(json.error);
        } else {
          parseData(json);
        }
      })
      .finally(() => {
        setLoading(false)
        setPerformRequest(false)
      });
    }
  }, [performRequest]);

  return {
    perform,
    loading,
    data,
    error,
  };
};

export default useApi;
