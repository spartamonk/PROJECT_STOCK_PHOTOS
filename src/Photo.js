import React from 'react'

const Photo = ({
  alt_description: alt,
  urls: { regular },
  likes,
  user: { name, portfolio_url:url, profile_image:{medium} },
}) => {
  return ( 
    <article className="photo">
      <img src={regular} alt={alt} />
      <div className="photo-info">
        <div>
          <h4>{name}</h4>
          <p>{likes} likes</p>
        </div>
        <a href={url}>
          <img src={medium} alt={name} className="user-img" />
        </a>
      </div>
  </article>
  )
}

export default Photo
