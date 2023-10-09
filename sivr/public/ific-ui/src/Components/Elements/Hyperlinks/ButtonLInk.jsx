import React from 'react'

export default function ButtonLInk(props) {
  return (
    <a className="btn px-4 btn-danger" target="_blank" href={props.url} rel="noreferrer">{props.title}</a>
  )
}
