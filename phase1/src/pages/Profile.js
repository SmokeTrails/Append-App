import React from 'react'
import '../css/Main.css';

export default function Profile() {
    return(
        <div>
            <div>
                <div class="ProfilePic">
                    <img style ={{width:"200px", height:"200px", borderRadius:"50%", border:"2px solid red"}}
                    src="https://st4.depositphotos.com/1156795/20814/v/950/depositphotos_208142514-stock-illustration-profile-placeholder-image-gray-silhouette.jpg"/>
                </div>
                <div class = "ProfileDescription">
                    <h1>Haider Bokhari</h1>

                    <div class = "UserInfo">
                        <p style={{fontSize:"110%"}}>6 Friends&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;10 Clubs&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;5 Courses</p>
                    </div>

                    <p style={{fontSize:"130%", width: "1000px", height: "140px", marginBottom: "20px"}}><strong>Bio:</strong> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate aute irure dolor in</p>
                    <p style={{fontSize:"120%", width: "1000px", height: "30px"}}><strong>Interests:</strong> #Lorem #ipsum #dolor</p>
                    <p style={{fontSize:"120%", width: "1000px", height: "30px"}}><strong>Current Year:</strong> 3&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<strong>Program:</strong> Computer Science Specialist</p>
                
                </div>
                <div class = "ClubsCourses">
                    <h3>Current Courses</h3>
                        <ul class="gallery">
                            <li style={{background: "#f6bd60"}}><h3 style={{marginTop:"10px", marginLeft:"10px", fontWeight:"normal", wordWrap: "break-word"}}><strong>CSC309:</strong> Web Programming</h3>
                            <img style ={{width:"235px", height:"120px", border:"2px solid red", marginLeft: "5px", marginTop: "30px"}}
                            src="https://miro.medium.com/max/12000/0*tQQ7SLPOJfxaG4ZY"/></li>
                            <li style={{background: "#f7ede2"}}><h3 style={{marginTop:"10px", marginLeft:"10px", fontWeight:"normal", wordWrap: "break-word"}}><strong>CSC309:</strong> Web Programming</h3>
                            <img style ={{width:"235px", height:"120px", border:"2px solid red", marginLeft: "5px", marginTop: "30px"}}
                            src="https://miro.medium.com/max/12000/0*tQQ7SLPOJfxaG4ZY"/></li>
                            <li style={{background: "#f5cac3"}}><h3 style={{marginTop:"10px", marginLeft:"10px", fontWeight:"normal", wordWrap: "break-word"}}><strong>CSC309:</strong> Web Programming</h3>
                            <img style ={{width:"235px", height:"120px", border:"2px solid red", marginLeft: "5px", marginTop: "30px"}}
                            src="https://miro.medium.com/max/12000/0*tQQ7SLPOJfxaG4ZY"/></li>
                            <li style={{background: "#84a59d"}}><h3 style={{marginTop:"10px", marginLeft:"10px", fontWeight:"normal", wordWrap: "break-word"}}><strong>CSC309:</strong> Web Programming</h3>
                            <img style ={{width:"235px", height:"120px", border:"2px solid red", marginLeft: "5px", marginTop: "30px"}}
                            src="https://miro.medium.com/max/12000/0*tQQ7SLPOJfxaG4ZY"/></li>
                            <li style={{background: "#f28482"}}><h3 style={{marginTop:"10px", marginLeft:"10px", fontWeight:"normal", wordWrap: "break-word"}}><strong>CSC309:</strong> Web Programming</h3>
                            <img style ={{width:"235px", height:"120px", border:"2px solid red", marginLeft: "5px", marginTop: "30px"}}
                            src="https://miro.medium.com/max/12000/0*tQQ7SLPOJfxaG4ZY"/></li>
                        </ul>
                    <h3>Current Clubs</h3>
                        <ul class="gallery" style = {{gridTemplateColumns: "repeat(10, 250px)"}}>
                                <li style={{background: "#f6bd60"}}><h3 style={{marginTop:"10px", marginLeft:"10px", fontWeight:"normal", wordWrap: "break-word"}}><strong>CSC309:</strong> Web Programming</h3>
                                <img style ={{width:"235px", height:"120px", border:"2px solid red", marginLeft: "5px", marginTop: "30px"}}
                                src="https://miro.medium.com/max/12000/0*tQQ7SLPOJfxaG4ZY"/></li>
                                <li style={{background: "#f7ede2"}}><h3 style={{marginTop:"10px", marginLeft:"10px", fontWeight:"normal", wordWrap: "break-word"}}><strong>CSC309:</strong> Web Programming</h3>
                                <img style ={{width:"235px", height:"120px", border:"2px solid red", marginLeft: "5px", marginTop: "30px"}}
                                src="https://miro.medium.com/max/12000/0*tQQ7SLPOJfxaG4ZY"/></li>
                                <li style={{background: "#f5cac3"}}><h3 style={{marginTop:"10px", marginLeft:"10px", fontWeight:"normal", wordWrap: "break-word"}}><strong>CSC309:</strong> Web Programming</h3>
                                <img style ={{width:"235px", height:"120px", border:"2px solid red", marginLeft: "5px", marginTop: "30px"}}
                                src="https://miro.medium.com/max/12000/0*tQQ7SLPOJfxaG4ZY"/></li>
                                <li style={{background: "#84a59d"}}><h3 style={{marginTop:"10px", marginLeft:"10px", fontWeight:"normal", wordWrap: "break-word"}}><strong>CSC309:</strong> Web Programming</h3>
                                <img style ={{width:"235px", height:"120px", border:"2px solid red", marginLeft: "5px", marginTop: "30px"}}
                                src="https://miro.medium.com/max/12000/0*tQQ7SLPOJfxaG4ZY"/></li>
                                <li style={{background: "#f28482"}}><h3 style={{marginTop:"10px", marginLeft:"10px", fontWeight:"normal", wordWrap: "break-word"}}><strong>CSC309:</strong> Web Programming</h3>
                                <img style ={{width:"235px", height:"120px", border:"2px solid red", marginLeft: "5px", marginTop: "30px"}}
                                src="https://miro.medium.com/max/12000/0*tQQ7SLPOJfxaG4ZY"/></li>
                                <li style={{background: "#f6bd60"}}><h3 style={{marginTop:"10px", marginLeft:"10px", fontWeight:"normal", wordWrap: "break-word"}}><strong>CSC309:</strong> Web Programming</h3>
                                <img style ={{width:"235px", height:"120px", border:"2px solid red", marginLeft: "5px", marginTop: "30px"}}
                                src="https://miro.medium.com/max/12000/0*tQQ7SLPOJfxaG4ZY"/></li>
                                <li style={{background: "#f7ede2"}}><h3 style={{marginTop:"10px", marginLeft:"10px", fontWeight:"normal", wordWrap: "break-word"}}><strong>CSC309:</strong> Web Programming</h3>
                                <img style ={{width:"235px", height:"120px", border:"2px solid red", marginLeft: "5px", marginTop: "30px"}}
                                src="https://miro.medium.com/max/12000/0*tQQ7SLPOJfxaG4ZY"/></li>
                                <li style={{background: "#f5cac3"}}><h3 style={{marginTop:"10px", marginLeft:"10px", fontWeight:"normal", wordWrap: "break-word"}}><strong>CSC309:</strong> Web Programming</h3>
                                <img style ={{width:"235px", height:"120px", border:"2px solid red", marginLeft: "5px", marginTop: "30px"}}
                                src="https://miro.medium.com/max/12000/0*tQQ7SLPOJfxaG4ZY"/></li>
                                <li style={{background: "#84a59d"}}><h3 style={{marginTop:"10px", marginLeft:"10px", fontWeight:"normal", wordWrap: "break-word"}}><strong>CSC309:</strong> Web Programming</h3>
                                <img style ={{width:"235px", height:"120px", border:"2px solid red", marginLeft: "5px", marginTop: "30px"}}
                                src="https://miro.medium.com/max/12000/0*tQQ7SLPOJfxaG4ZY"/></li>
                                <li style={{background: "#f28482"}}><h3 style={{marginTop:"10px", marginLeft:"10px", fontWeight:"normal", wordWrap: "break-word"}}><strong>CSC309:</strong> Web Programming</h3>
                                <img style ={{width:"235px", height:"120px", border:"2px solid red", marginLeft: "5px", marginTop: "30px"}}
                                src="https://miro.medium.com/max/12000/0*tQQ7SLPOJfxaG4ZY"/></li>
                                
                            </ul>

                </div>
            </div>
        </div>
    )
}
