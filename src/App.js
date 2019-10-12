import React, { Component } from 'react';
import Clarifai from 'clarifai';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Particles from 'react-particles-js';
import './App.css';


const app = new Clarifai.App({
 apiKey: '3c33d15ab082473e8d4a875326e45484'
});

const particlesOptions = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
};

class App extends Component {

  constructor() {
    super();
    this.state = {
      input: '',
      imageURL: '',
      box: {},
      route: 'signin',
      isSignedin: false
    };
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: Number(clarifaiFace.left_col) * width,
      topRow: Number(clarifaiFace.top_row) * height,
      rightCol: width - (Number(clarifaiFace.right_col) * width),
      bottomRow: height - (Number(clarifaiFace.bottom_row) * height)
    };
  }

  displayFaceBox = (box) => {
    this.setState({ box: box });
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onButtonSubmit = () => {
    this.setState({ imageURL: this.state.input })
    
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response => this.displayFaceBox(this.calculateFaceLocation(response)))
      .catch(error => console.log(error));
  }

  onRouteChange = (route) => {
    if (route === 'signin') {
      this.setState({ isSignedin: false });
    } else if (route === 'home') {
      this.setState({ isSignedin: true })
    }

    this.setState({ route: route });
  }

  render() {
    const { isSignedin, route, box, imageURL } = this.state;
    return (
      <div className="App tc">
        <Particles className='particles' params={particlesOptions} /> 
        <Navigation isSignedin={isSignedin} onRouteChange={this.onRouteChange} />
        { route === 'home'
          ? <div>
              <Logo />
              <Rank />
              <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
              <FaceRecognition box={box} imageURL={imageURL} />
            </div>

          : (
            route === 'signin'
            ? <Signin onRouteChange={this.onRouteChange} />
            : <Register onRouteChange={this.onRouteChange} />
            ) 
        }
      </div>
    );
  }
}


export default App;
