import React, { useState, useEffect } from "react"
import { graphql } from 'gatsby'
import { useDispatch, useSelector } from "react-redux"
// import styles from '../styles/index.module.less'
// console.log(styles)

export default function Home({data}) {
  console.log(data)
  const dispatch = useDispatch()
  const quickReducer = useSelector(state => state.quickReducer)
  const { quickData } = quickReducer
  // const [quickData, setQuickData] = useState(data.allQuickJson.nodes)
  const length = data.allQuickJson.nodes.length
  const [show, setShow] = useState(false)
  const [name, setName] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    dispatch({
      type: 'CHANGEDATA',
      payload: data.allQuickJson.nodes
    })
  }, [])

  const handleAdd = () => {
    setShow(true)
  }

  let linkStyle
  if(show) {
    linkStyle = { 
      display: 'block',
      width: '500px',
      height: '300px',
      margin: '0 auto',
      border: '1px solid #f1f3f4'
    }
  }else {
    linkStyle = { display: 'none' }
  }

  const handleName = (e) => {
    const val = e.target.value
    setName(val)
  }

  const handleUrl = (e) => {
    const val = e.target.value
    setUrl(val)
  }

  const handleCancle = () => {
    setShow(false)
  }

  function copy (obj) {
    var newobj = obj.constructor === Array ? [] : {};
    if(typeof obj !== 'object'){
        return;
    }
    for(var i in obj){
       newobj[i] = typeof obj[i] === 'object' ? copy(obj[i]) : obj[i];
    }
    return newobj
}

  const handleOk = () => {
    const newData = {
      title: name,
      url,
      img: `${url}/favicon.ico`
    } 
    const quickDataCopy = copy(quickData)
    if(quickData.length < 10) {
      quickDataCopy.push(newData)
    }
    if(quickData.length = 10) {
      quickDataCopy.splice(9, 1, newData)
    }
    dispatch({
      type: 'CHANGEDATA',
      payload: quickDataCopy
    })
  }

  return <div>
    {/* <div style={{ backgroundImage: 'url(../../static/google_logo.svg)' }}></div> */}
    <div style={{ display: 'flex', flexWrap: 'wrap', width: '573px', height: '256px', margin: '200px auto' }}>
      {quickData.map((item, index) => {
        if (index < length-1) {
          return (
            <div key={index} style={{ boxSizing: 'border-box', height: '112px', width: '112px', padding: '12px 16px 4px', margin: '3px 0 13px', hover: '' }}>
              <div
                style={{ margin: '0 auto', width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f1f3f4' }}
              >
                <img src={item.img} height="24px" width="24px" />
              </div>
              <div style={{ boxSizing: 'border-box', marginTop: '22px', width: '88px', fontSize: '13px', textOverflow: 'ellipsis', whiteSpace: 'nowrap', textAlign: 'center', overflow: 'hidden' }}>{item.title}</div>
            </div>
          )
        }else {
          return (
            <div key={index} style={{ boxSizing: 'border-box', height: '112px', width: '112px', padding: '12px 16px 4px', margin: '3px 0 13px' }}>
              <div
                style={{ margin: '0 auto', width: '48px', height: '48px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f1f3f4' }}
                onClick={handleAdd}
              >
                {item.img ? <img src={item.img} height="24px" width="24px" /> : <span>+</span>}
              </div>
              <div style={{ boxSizing: 'border-box', marginTop: '22px', width: '88px', fontSize: '13px', textOverflow: 'ellipsis', whiteSpace: 'nowrap', textAlign: 'center', overflow: 'hidden' }}>{item.title}</div>
            </div>
          )
        }
      })}
    </div>
    <div
      style={linkStyle}
    >
      <div>添加快捷方式</div>
      <div>名称<input onChange={handleName}></input></div>
      <div>网址<input onChange={handleUrl}></input></div>
      <button onClick={handleCancle}>取消</button>
      <button onClick={handleOk}>确定</button>
    </div>
  </div>
}

export const query = graphql`
  query {
    allQuickJson {
      nodes {
        url
        title
        img
      }
    }
  }
`
