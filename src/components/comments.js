import React from "react"
import Gitalk from "gatsby-plugin-gitalk"
import '@suziwen/gitalk/dist/gitalk.css'

import MD5 from 'crypto-js/md5'

class Comments extends React.Component {

  render() {
    const commentHost = 'https://suziwen.github.io'
    const post = this.props.post
    const gitalkConfig = {
        id: MD5(post.slug || post.id),
        title: post.title
      }
      if (typeof window !== 'undefined' && window.location.origin === commentHost) {
        const location = window.location
        gitalkConfig['url'] = location.origin + location.pathname + location.search
      }
    return (
      <>
        {!!gitalkConfig && typeof window !== 'undefined' && window.location.origin === commentHost && (<Gitalk
          options={gitalkConfig}
        />)}
      </>
    )
  }
}

export default Comments

