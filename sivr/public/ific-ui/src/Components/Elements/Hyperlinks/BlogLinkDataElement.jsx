import React from 'react'

export default function BlogLinkDataElement(props) {
  return (
    <>
        
        {props.blogContent?<>
            <div style={{width:'100%'}}>
                <div style={{display:'block', width:'100%'}} dangerouslySetInnerHTML={{ __html: props.blogContent }}></div>
            </div>
        </>:<></>}
       
    </>
  )
}
