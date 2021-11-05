import React, { useState, useEffect } from 'react';
import '../css/Main.css';

// export default function Profile() {
//     return(
//         <div>
//             <div id = "UserProfile">
                
//                 <div className="ProfilePic">
//                     <img style ={{width:"200px", height:"200px", borderRadius:"50%", border:"2px solid red"}}
//                     src="https://st4.depositphotos.com/1156795/20814/v/950/depositphotos_208142514-stock-illustration-profile-placeholder-image-gray-silhouette.jpg" alt="Profile Picture" />
//                 </div>
//                 <div className = "ProfileDescription">
//                     <h1>Haider Bokhari</h1>

//                     <div className = "UserInfo">
//                         <p style={{fontSize:"110%"}}>6 Friends&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;10 Clubs&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;5 Courses</p>
//                     </div>

//                     <p style={{fontSize:"130%", width: "1000px", height: "140px", marginBottom: "20px"}}><strong>Bio:</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate aute irure dolor in</p>
//                     <p style={{fontSize:"120%", width: "1000px", height: "30px"}}><strong>Interests:</strong> #Lorem #ipsum #dolor</p>
//                     <p style={{fontSize:"120%", width: "1000px", height: "30px"}}><strong>Current Year:</strong> 3&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>Program:</strong> Computer Science Specialist</p>
                
//                 </div>
//                 <div className = "ClubsCourses">
//                     <h3>Current Courses</h3>
//                         <ul className="gallery">
//                             <li style={{background: "#f6bd60"}}><h3 style={{marginTop:"10px", marginLeft:"10px", fontWeight:"normal", wordWrap: "break-word"}}><strong>CSC309:</strong> Web Programming</h3>
//                             <img style ={{width:"235px", height:"120px", border:"2px solid red", marginLeft: "5px", marginTop: "30px"}}
//                             src="https://miro.medium.com/max/12000/0*tQQ7SLPOJfxaG4ZY" alt="Course Image" /></li>
//                             <li style={{background: "#f7ede2"}}><h3 style={{marginTop:"10px", marginLeft:"10px", fontWeight:"normal", wordWrap: "break-word"}}><strong>CSC309:</strong> Web Programming</h3>
//                             <img style ={{width:"235px", height:"120px", border:"2px solid red", marginLeft: "5px", marginTop: "30px"}}
//                             src="https://miro.medium.com/max/12000/0*tQQ7SLPOJfxaG4ZY" alt="Course Image" /></li>
//                             <li style={{background: "#f5cac3"}}><h3 style={{marginTop:"10px", marginLeft:"10px", fontWeight:"normal", wordWrap: "break-word"}}><strong>CSC309:</strong> Web Programming</h3>
//                             <img style ={{width:"235px", height:"120px", border:"2px solid red", marginLeft: "5px", marginTop: "30px"}}
//                             src="https://miro.medium.com/max/12000/0*tQQ7SLPOJfxaG4ZY" alt="Course Image" /></li>
//                             <li style={{background: "#84a59d"}}><h3 style={{marginTop:"10px", marginLeft:"10px", fontWeight:"normal", wordWrap: "break-word"}}><strong>CSC309:</strong> Web Programming</h3>
//                             <img style ={{width:"235px", height:"120px", border:"2px solid red", marginLeft: "5px", marginTop: "30px"}}
//                             src="https://miro.medium.com/max/12000/0*tQQ7SLPOJfxaG4ZY" alt="Course Image" /></li>
//                             <li style={{background: "#f28482"}}><h3 style={{marginTop:"10px", marginLeft:"10px", fontWeight:"normal", wordWrap: "break-word"}}><strong>CSC309:</strong> Web Programming</h3>
//                             <img style ={{width:"235px", height:"120px", border:"2px solid red", marginLeft: "5px", marginTop: "30px"}}
//                             src="https://miro.medium.com/max/12000/0*tQQ7SLPOJfxaG4ZY" alt="Course Image" /></li>
//                         </ul>
//                     <h3>Current Clubs</h3>
//                         <ul className="gallery" style = {{gridTemplateColumns: "repeat(10, 250px)"}}>
//                                 <li style={{background: "#f6bd60"}}><h3 style={{marginTop:"10px", marginLeft:"10px", fontWeight:"normal", wordWrap: "break-word"}}><strong>CSC309:</strong> Web Programming</h3>
//                                 <img style ={{width:"235px", height:"120px", border:"2px solid red", marginLeft: "5px", marginTop: "30px"}}
//                                 src="https://miro.medium.com/max/12000/0*tQQ7SLPOJfxaG4ZY" alt="Club Image" /></li>
//                                 <li style={{background: "#f7ede2"}}><h3 style={{marginTop:"10px", marginLeft:"10px", fontWeight:"normal", wordWrap: "break-word"}}><strong>CSC309:</strong> Web Programming</h3>
//                                 <img style ={{width:"235px", height:"120px", border:"2px solid red", marginLeft: "5px", marginTop: "30px"}}
//                                 src="https://miro.medium.com/max/12000/0*tQQ7SLPOJfxaG4ZY" alt="Club Image" /></li>
//                                 <li style={{background: "#f5cac3"}}><h3 style={{marginTop:"10px", marginLeft:"10px", fontWeight:"normal", wordWrap: "break-word"}}><strong>CSC309:</strong> Web Programming</h3>
//                                 <img style ={{width:"235px", height:"120px", border:"2px solid red", marginLeft: "5px", marginTop: "30px"}}
//                                 src="https://miro.medium.com/max/12000/0*tQQ7SLPOJfxaG4ZY" alt="Club Image" /></li>
//                                 <li style={{background: "#84a59d"}}><h3 style={{marginTop:"10px", marginLeft:"10px", fontWeight:"normal", wordWrap: "break-word"}}><strong>CSC309:</strong> Web Programming</h3>
//                                 <img style ={{width:"235px", height:"120px", border:"2px solid red", marginLeft: "5px", marginTop: "30px"}}
//                                 src="https://miro.medium.com/max/12000/0*tQQ7SLPOJfxaG4ZY" alt="Club Image" /></li>
//                                 <li style={{background: "#f28482"}}><h3 style={{marginTop:"10px", marginLeft:"10px", fontWeight:"normal", wordWrap: "break-word"}}><strong>CSC309:</strong> Web Programming</h3>
//                                 <img style ={{width:"235px", height:"120px", border:"2px solid red", marginLeft: "5px", marginTop: "30px"}}
//                                 src="https://miro.medium.com/max/12000/0*tQQ7SLPOJfxaG4ZY" alt="Club Image" /></li>
//                                 <li style={{background: "#f6bd60"}}><h3 style={{marginTop:"10px", marginLeft:"10px", fontWeight:"normal", wordWrap: "break-word"}}><strong>CSC309:</strong> Web Programming</h3>
//                                 <img style ={{width:"235px", height:"120px", border:"2px solid red", marginLeft: "5px", marginTop: "30px"}}
//                                 src="https://miro.medium.com/max/12000/0*tQQ7SLPOJfxaG4ZY" alt="Club Image" /></li>
//                                 <li style={{background: "#f7ede2"}}><h3 style={{marginTop:"10px", marginLeft:"10px", fontWeight:"normal", wordWrap: "break-word"}}><strong>CSC309:</strong> Web Programming</h3>
//                                 <img style ={{width:"235px", height:"120px", border:"2px solid red", marginLeft: "5px", marginTop: "30px"}}
//                                 src="https://miro.medium.com/max/12000/0*tQQ7SLPOJfxaG4ZY" alt="Club Image" /></li>
//                                 <li style={{background: "#f5cac3"}}><h3 style={{marginTop:"10px", marginLeft:"10px", fontWeight:"normal", wordWrap: "break-word"}}><strong>CSC309:</strong> Web Programming</h3>
//                                 <img style ={{width:"235px", height:"120px", border:"2px solid red", marginLeft: "5px", marginTop: "30px"}}
//                                 src="https://miro.medium.com/max/12000/0*tQQ7SLPOJfxaG4ZY" alt="Club Image" /></li>
//                                 <li style={{background: "#84a59d"}}><h3 style={{marginTop:"10px", marginLeft:"10px", fontWeight:"normal", wordWrap: "break-word"}}><strong>CSC309:</strong> Web Programming</h3>
//                                 <img style ={{width:"235px", height:"120px", border:"2px solid red", marginLeft: "5px", marginTop: "30px"}}
//                                 src="https://miro.medium.com/max/12000/0*tQQ7SLPOJfxaG4ZY" alt="Club Image" /></li>
//                                 <li style={{background: "#f28482"}}><h3 style={{marginTop:"10px", marginLeft:"10px", fontWeight:"normal", wordWrap: "break-word"}}><strong>CSC309:</strong> Web Programming</h3>
//                                 <img style ={{width:"235px", height:"120px", border:"2px solid red", marginLeft: "5px", marginTop: "30px"}}
//                                 src="https://miro.medium.com/max/12000/0*tQQ7SLPOJfxaG4ZY" alt="Club Image" /></li>
                                
//                             </ul>

//                 </div>
                
//             </div>
//         </div>
//     )
// }

function CardItem(props){
    return(
        <li style={{background: "#f6bd60"}}><h3 style={{marginTop:"10px", marginLeft:"10px", fontWeight:"normal", wordWrap: "break-word"}}><strong>{props.courseCode}:</strong> {props.courseTitle}</h3>
        <img style ={{width:"235px", height:"120px", border:"2px solid red", marginLeft: "5px", marginTop: "30px"}}
        src="https://miro.medium.com/max/12000/0*tQQ7SLPOJfxaG4ZY" alt="Course Image" /></li>
    );
    
}

function Avatar(props){
    return(
        <img className = 'Avatar'
        style ={{width:"200px", height:"200px", borderRadius:"50%", border:"2px solid red"}}
        src = "https://st4.depositphotos.com/1156795/20814/v/950/depositphotos_208142514-stock-illustration-profile-placeholder-image-gray-silhouette.jpg"
        alt="Profile Picture"
        />
    );
}

function ProfileDescription(props){
    return(
        <div className = "ProfileDescription">
            <h1>{props.name}</h1>

            <div className = "UserInfo">
                <p style={{fontSize:"110%"}}>{props.friendCount} Friends&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{props.clubCount} Clubs&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{props.courseCount} Courses</p>
            </div>

            <p style={{fontSize:"130%", width: "1000px", height: "140px", marginBottom: "20px"}}><strong>Bio:</strong>{props.bio}</p>
            <p style={{fontSize:"120%", width: "1000px", height: "30px"}}><strong>Interests:</strong> {props.interests}</p>
            <p style={{fontSize:"120%", width: "1000px", height: "30px"}}><strong>Current Year:</strong> {props.year}&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>Program:</strong> {props.program}</p>
        
        </div>
    );
}

function GalleryView(props){
    return(
        <div>
            <h3>{props.title}</h3>
            <ul className="gallery">
                <CardItem courseCode='CSC309'courseTitle="Web Programming"/>
                <CardItem courseCode='CSC309'courseTitle="Web Programming"/>
                <CardItem courseCode='CSC309'courseTitle="Web Programming"/>
                <CardItem courseCode='CSC309'courseTitle="Web Programming"/>
            </ul>
        </div>
    );
}

export default class UserProfile extends React.Component{
    constructor(props){
        super(props);
        this.editClick = this.editClick.bind(this);
        this.saveClick = this.saveClick.bind(this);
        this.state = {isEditing: false}
    }
    editClick(){
        this.setState({isEditing: true})
    }

    saveClick(){
        this.setState({isEditing: false})
    }

    render(){
        const isEditing = this.state.isEditing;
        let button;
        if (isEditing){
            button = <button onClick={this.saveClick}>
            Save
          </button>;
        }else{
            button = <button onClick={this.editClick}>
            Edit
          </button>;
        }

        return(
            <div>
                <Avatar />
                <ProfileDescription name='Haider Bokhari' friendCount='3' clubCount='10' courseCount='5' bio='Hello 123' interests='#1 #test #2' year='3' program='Computer Science Specialist'/>
                <GalleryView name='Current Courses'/>
                <GalleryView name='Current Clubs'/>
            </div>
        )
    }

}


// function editButton(){
//     console.log(up);
//     const ProfileDesc = up.children[2];
//     const bio = ProfileDesc.children[2];
//     const button = ProfileDesc.children[0];
//     const input = document.createElement('input');
//     input.type = 'text';
//     input.style.width = '1000px';
//     input.style.width = '140px';
//     input.style.fontSize = '130%';
//     input.value = bio.textContent;
//     ProfileDesc.insertBefore(input, bio);
//     ProfileDesc.removeChild(bio);
//     //this.changeText = 'Save';
// }