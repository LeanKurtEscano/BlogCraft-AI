import React, { useState,useContext } from 'react';
import '../styles/Home.css';
import axios from 'axios';
import { MyContext } from './MyContext';


const Home = () => {
  const [loading, setLoading] = useState(false);
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState('Tone'); 
  const [style, setStyle] = useState('Style'); 
  const [complexity, setComplexity] = useState('Complexity'); 
  const [content, setContent] = useState('');
  const [invalid, setInvalid] = useState('');
  const { username, setUsername } = useContext(MyContext);

  const sendContent = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8000/api/send/', {
        topic,
        style,
        tone,
        complexity,
        username
      }, {
        headers: {
          "Content-Type": "application/json"
        }
      });
  
      console.log('Server response:', response.data); 
      
      // Check if the response contains the article and update the state
      if(response.data.article){
        setContent(response.data.article);
        setInvalid('');
      } else {
        setInvalid('Failed to generate the article. Please try again.');
      }
    } catch (error) {
      console.error('Error sending the request:', error);
      setInvalid('Failed to generate the article. Please try again.');
    } finally {
      setLoading(false); 
    }
  }
  

  return (
    <section className='section1'>
      <div className='main-container'>
        <div className='title-container'>
          <h1 className='title'>Welcome to BlogClipper</h1>
        </div>
        <div className='desc'>
          <p>
            Generate high-quality blog articles from YouTube videos using artificial intelligence. Simply
            enter the link to the YouTube videos below and let the AI create the content for you!
          </p>
        </div>
        <div className='enter'>
          <h2 className='title-2'>Enter YouTube Video Link</h2>
        </div>
        <div className='input-container'>
          <input
            type='text'
            id='topic'
            className='new-input'
            placeholder='Enter your topic here'
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
          />
          {invalid && <p className='error-text'>{invalid}</p>}
        </div>
        <div className='option-container'>
          <select value={tone} onChange={(e) => setTone(e.target.value)} className='choose-option' required>
            <option value="Tone" disabled>{tone}</option> 
            <option value="Informative">Informative</option>
            <option value="Persuasive">Persuasive</option>
            <option value="Casual">Casual</option>
            <option value="Professional">Professional</option>
          </select>

          <select value={style} onChange={(e) => setStyle(e.target.value)} className='choose-option' required>
            <option value="Style" disabled>{style}</option> 
            <option value="Narrative">Narrative</option>
            <option value="Descriptive">Descriptive</option>
            <option value="Expository">Expository</option>
          </select>

          <select value={complexity} onChange={(e) => setComplexity(e.target.value)} className='choose-option' required>
            <option value="Complexity" disabled>{complexity}</option> 
            <option value="Simple">Simple</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
        <button className='btn' onClick={sendContent} disabled={loading}>
          {loading ? 'Generating...' : 'Generate'}
        </button>

        <div className="dynamic-content">
            {loading && (
                <div id="loading-circle" className='load'></div>
            )}
        </div>
        <div className='generated-title'>
          <h2 className='title-2'>Generated Blog Article</h2>
        </div>
        <div className='generated-container'>
          <p>{content}</p>
        </div>
      </div>
    </section>
  );
};

export default Home;
