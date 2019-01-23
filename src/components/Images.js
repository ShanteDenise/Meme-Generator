import React from 'react'
import {Modal, ModalHeader, ModalBody, FormGroup, Label, NavbarBrand} from 'reactstrap';

const photos = [
    { src: 'img/crying-face-dawson.jpg'},
    { src: 'img/First-World-Problems.jpg'},
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
 function openImage (index){
     console.log(photos[index])
 }


 class Images extends React.Component {
         state = {
             currentImage: 0,
             modalIsOpen: false,
             ...initialState
         };
     
  render() {
    return (
      <div>
          <div className="content"></div>
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
              onClick={() => openImage(index) /* The onclick here determines current image */}
            />
            <span className="bottomCaption">Bottom text</span>
          </div>
        ))}
      </div>
    )
  }
}
 export default Images;