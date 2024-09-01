import React, { useState,useContext } from 'react';
import '../styles/Home.css';
import axios from 'axios';
import { MyContext } from './MyContext';


const Home = ({isAuthenticate}) => {
  const [loading, setLoading] = useState(false);
  const [topic, setTopic] = useState('');
  const [tone, setTone] = useState('Tone'); 
  const [style, setStyle] = useState('Style'); 
  const [complexity, setComplexity] = useState('Complexity'); 
  const [content, setContent] = useState('');
  const [invalid, setInvalid] = useState('');
  const [missing, setMissing] = useState('');
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
       
        setTopic('');
      } else {
        setInvalid('Failed to generate the article. Please try again.');
      }

      if (response.data.missing){
        setMissing("Missing required fields");
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
          <h1 className='title'>Welcome to BlogCraft AI
          </h1>
        </div>
        <div className='desc'>
          <p>
            Unlock the power of AI to craft compelling blog content with ease. BlogCraft AI enables you to input your desired blog topic, select the style, tone, and complexity, and let our intelligent assistant generate polished articles tailored to your specifications. 
          </p>
        </div>
        <div className='enter'>
          <h2 className='title-2'>Enter Your Topic</h2>
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
            <option  disabled>{tone}</option> 
            <option value="Informative">Informative</option>
            <option value="Persuasive">Persuasive</option>
            <option value="Casual">Casual</option>
            <option value="Professional">Professional</option>
          </select>

          <select value={style} onChange={(e) => setStyle(e.target.value)} className='choose-option' required>
            <option disabled>{style}</option> 
            <option value="Narrative">Narrative</option>
            <option value="Descriptive">Descriptive</option>
            <option value="Expository">Expository</option>
          </select>

          <select value={complexity} onChange={(e) => setComplexity(e.target.value)} className='choose-option' required>
            <option disabled>{complexity}</option> 
            <option value="Simple">Simple</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>
        {missing && <p className='error-text'>{missing}</p>}

        <button className= {`btn ${isAuthenticate ? 'btn': 'btn-disabled'}`} onClick={sendContent} disabled={!isAuthenticate}>
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
        {content && (
          <div className='generated-container'>
          <p>{content}</p>
        </div>
        )}
      </div>
    </section>
  );
};

export default Home;
