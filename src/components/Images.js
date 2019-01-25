import React from 'react'
import {Modal, ModalHeader, ModalBody, FormGroup, Label, Button} from 'reactstrap';

// const photos = [
//     {src: 'img/crying-face-dawson.jpg'},
//     {src: 'img/First-World-Problems.jpg'},
//     {src: 'img/mad-arthur.jpg'},
//     {src: 'img/side-eye-chloe.jpg'},
//     {src: 'img/Successful_kid_meme.png'},
//     {src: 'img/Think-About-It.jpg'},
//     {src: 'img/Unimpressed_kid.jpg'},
//     {src: 'img/Everywhere-ToyStory.jpg'},
//     {src: 'img/Am-I-The-Only-One-Around-Here.jpg'},
//     {src: 'img/grandma-computer.png'},
//     {src: 'img/Is-This-A-Pigeon.jpg'},
//     {src: 'img/skeleton_bench.jpg'},
//     {src: 'img/Yo-Dawg-Heard-You.jpg'},
//     {src: 'img/spongebob.jpg'},
//     {src: 'img/Face-You-Make.jpg'},
//     {src: 'img/kevin_hart.jpeg'}

// ]





const MAX_LENGTH = 30


 class Images extends React.Component {
    state = {
        currentImage: "",
        modalIsOpen: false,
        photos: [],
        toptext: "",
        bottomtext: "",
        isTopDragging: false,
        isBottomDragging: false,
        topY: "10%",
        topX: "50%",
        bottomX: "0%",
        bottomY: "90%",
    };

    componentDidMount(){
      this.getMeme()
    }
    getMeme = async() => {
      const api_call = await fetch('https://api.imgflip.com/get_memes')
      const data = await api_call.json();
        this.setState({
          photos: data.data.memes
        })
    }
   

    changeText = (event) => {
        this.setState({
          [event.currentTarget.name]: event.currentTarget.value
        });
      }


    openImage (url){ 
      console.log(url)       
        this.setState({
            currentImage: url,
            modalIsOpen: true,       
        })
    }


    toggle = () => {
        this.setState(prevState => ({
            modalIsOpen: !prevState.modalIsOpen
        }))
    }

        
        
  

  render() {
    return (

      <div className="main-content">
          <div className="content">
          {this.state.photos.map((image, index) => (
          <div className="image" key={image.url}>
            {/* <span className="top-text caption">Top text</span> */}
            <img
              style={{
                width: "100px",
                cursor: "pointer"
              }}
              alt={index}
              src={image.url}
              onClick={() => this.openImage(image.url) /* Determines current image */}
            />
            {/* <span className="bottom-text caption">Bottom text</span> */}
          </div>
        ))}</div>
          
          <Modal className="meme-gen-modal" isOpen={this.state.modalIsOpen}>
          <ModalHeader toggle={this.toggle}>Make-a-Meme</ModalHeader>
          
          <ModalBody>
             <img alt="meme" src={this.state.currentImage}
             height="100%"
             width="100%" 
             role="presentation"/>
             <p className="toptext"
                dominatbaseline="middle"
                textAnchor="middle"
                x={this.state.topX}
                y={this.state.topY}
                onMouseDown={event => this.handleMouseDown(event, 'top')}
                onMouseUp={event => this.handleMouseUp(event, 'top')}
                >
                { `${this.state.toptext.substring(0, MAX_LENGTH)}`}
            </p>

            <p className="bottomtext"
                x={this.state.bottomX}
                y={this.state.bottomY}
                onMouseDown={event => this.handleMouseDown(event, 'bottom')}
                onMouseUp={event => this.handleMouseUp(event, 'bottom')}
                >
                 {this.state.bottomtext}
            </p>
               
                
             <div className="meme-form">
              <FormGroup>
                <Label for="toptext">Top Text</Label>
                <input className="form-control" type="text" name="toptext" id="toptext" placeholder="Add text to the top" onChange={this.changeText} />
              </FormGroup>
              <FormGroup>
                <Label for="bottomtext">Bottom Text</Label>
                <input className="form-control" type="text" name="bottomtext" id="bottomtext" placeholder="Add text to the bottom" onChange={this.changeText} />
              </FormGroup>
              <a href={this.state.currentImage} download><Button color="info">Download</Button></a>
              </div>

            
          </ModalBody>
          </Modal>
          
          
        
      </div>
    
    )

  }
}
 export default Images;