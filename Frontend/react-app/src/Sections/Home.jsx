import React from 'react'
import '../styles/Home.css'
const Home = () => {
  return (
    <section className='section1'>
        <div className='main-container'>
            <div className='title-container'>
                <h1 className='title'>Welcome to BlogClipper</h1>
            </div>
            <div className='desc'>
               <p>Generate high-quality blog articles from
                youtube videos using artificial intelligence.Simply
                enter the link to the Youtube videos below
                and let the Ai create the content for you!</p> 
            </div>
            <div className='enter'>
                   <h2 className='title-2'> Enter Youtube Video Link</h2>
            </div>
            <div className='input-container'>
                <input type='url' id='youtube-link' className='new-input' placeholder="Paste YouTube Link Here..."></input>
                <button className='btn'>Generate</button>
            </div>
            <div className='generated-title'>
                <h2 className='title-2'>Generated Blog Article</h2>
            </div>
            <div className='generated-container'>
            </div>
        </div>
    </section>
  )
}

export default Home