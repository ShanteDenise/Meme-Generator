import React from 'react'
import {Modal, ModalHeader, ModalBody, FormGroup, Label, NavbarBrand} from 'reactstrap';

const photos = [
    {src: 'img/crying-face-dawson.jpg'},
    {src: 'img/First-World-Problems.jpg'},
    {src: 'img/mad-arthur.jpg'},
    {src: 'img/side-eye-chloe.jpg'},
    {src: 'img/Successful_kid_meme.png'},
    {src: 'img/Think-About-It.jpg'},
    {src: 'img/Unimpressed_kid.jpg'},
    {src: 'img/Everywhere-ToyStory'}

]


const initialState = {
    toptext: "",
    bottomtest: "",
    isTopDragging: false,
    isBottomDragging: false,
    topY: "10%",
    topX: "50%",
    bottomX: "50%",
    bottomY: "90%"
}






 class Images extends React.Component {
    state = {
        currentImage: 0,
        modalIsOpen: false,
        toptext: "",
        bottomtext: "",
        isTopDragging: false,
        isBottomDragging: false,
        topY: "10%",
        topX: "50%",
        bottomX: "50%",
        bottomY: "90%"
    };

    changeText = (event) => {
        this.setState({
          [event.currentTarget.name]: event.currentTarget.value
        });
        console.log(event.currentTarget.value)
      }


    openImage (index){
        console.log(photos[index].src)
        
        this.setState({
            currentImage: photos[index].src,
            modalIsOpen: true,
            
           
        })
        console.log(this.state)
        
    } 

  render() {
    return (
      <div>
          <div className="content">
          <Modal className="meme-gen-modal" isOpen={this.state.modalIsOpen}>
          <ModalHeader toggle={this.toggle}>Make-a-Meme</ModalHeader>
          <ModalBody>
             <img alt="meme" src={this.state.currentImage}
             height="100%"
             width="100%" />
             <div className="meme-form">
              <FormGroup>
                <Label for="toptext">Top Text</Label>
                <input className="form-control" type="text" name="toptext" id="toptext" placeholder="Add text to the top" onChange={this.changeText} />
              </FormGroup>
              </div>

            
          </ModalBody>
          </Modal>
          
          
          
        
          
          {photos.map((image, index) => (
          <div className="image" key={image.src}>
            <span className="topCaption">Top text</span>
            <img
              style={{
                width: "100%",
                height: "100%"
              }}
              alt={index}
              src={image.src}
              onClick={() => this.openImage(index) /* The onclick here determines current image */}
            />
            <span className="bottomCaption">Bottom text</span>
          </div>
        ))}
      </div>
      </div>
    )
  }
}
 export default Images;