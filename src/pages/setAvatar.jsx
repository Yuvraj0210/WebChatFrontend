    import React,{useState,useEffect} from "react";
    import {useNavigate } from "react-router-dom";
    import styled from "styled-components";
    import loader from "../loader.gif"
    import {ToastContainer,toast} from "react-toastify"
    import "react-toastify/dist/ReactToastify.css"
    import axios from 'axios'
    import { avatarRoute, setAvatarRoute } from "../utils/APIRoutes";
    import { Buffer } from "buffer";
    



    const toastOptions = {
        position:"bottom-right",
        autoClose:8000,
        pauseOnHover:true,
        dragable:true,
      }

    function Avatar() {
        const api = "https://api.multiavatar.com";
        const navigate = useNavigate();
         

        const [avatars,setAvatars] = useState([]);
        const [isLoading,setIsLoading] = useState(true);
        const [selectedAvatar,setSelectedAvatar] = useState(undefined);

        useEffect(()=>{
            if(!localStorage.getItem("chat-app-user")){
                navigate("/login");
            }
        },[])

        const setProfilePicture = async()=>{
            if(selectedAvatar===undefined){
                toast.error("Please selecgt an avatar first",toastOptions);
            }
            else{
                const user = await JSON.parse(localStorage.getItem("chat-app-user"));
                const{data} = await axios.post(`${avatarRoute}/${user._id}`,{
                    image:avatars[selectedAvatar],
                })
                
                if(data.isSet){
                    user.isAvatarSet = true;
                    user.avatarImage = data.image;
                    localStorage.setItem("chat-app-user",JSON.stringify(user));
                    navigate("/Chat");
                }
                else{
                    toast.error("error setting the Profile Picture",toastOptions);
                }

            }
        }

        useEffect(() => {
            async function caller() {
                const data = [];
                for (let i = 0; i < 4; i++) {
                    const image = await axios.get(`${api}/${Math.round(Math.random() * 1000)}?apikey=nIl68GaQq9XTcu`);
                    const buffer = new Buffer(image.data);
                    data.push(buffer.toString("base64"));
                }
                console.log(avatars);
                setAvatars(data);
                setIsLoading(false);
            }
        
            caller();
        }, []);
        

    return (
        <>
        {isLoading?<Container>  
            <img src = {loader} alt = "loader" className = "loader"/>
        </Container>:(
             <Container>
             <div className="title-container">
                 <h1>
                     Pick an Avatar as your profile picture
                 </h1>
             </div>
             <div className="avatars">
                 {
                         avatars.map((avatar,index)=>{
                             return(
                                 <div key ={index} className = {`avatar ${selectedAvatar === index?"selected":""}`}>
                                     <img src = {`data:image/svg+xml;base64,${avatar}`} alt = ""
                                     onClick={()=>{setSelectedAvatar(index)}}
                                     />
                                 </div>
                             )
                         })
                 }
             </div>
             <button className = 'submit-btn' onClick = {setProfilePicture}>set as Profile Picture</button>
 
         </Container>
          )}
         <ToastContainer/>
       
       
        </>
    );
    }

    const Container = styled.div`
    display:flex;
    justify-content:center;
    align-items:center;
    flex-direction:column;
    gap:3rem;
    background-color:#131324;
    height:100vh;
    width:100vw;

    .title-container{
        h1{
            color:white;
        }
    }
    .avatars
    {
        display:flex;
        gap:2rem;
        
        
        .avatar{
            border:0.4rem solid transparent;
            padding:0.4rem;
            border-radius:5rem;
            display:flex;
            transition:0.5s ease-in-out;
            img{
                    height:6rem;
                    
            }
            
        }
        .selected{
            border:0.4rem solid yellow;
    }
    
        
    }
    .submit-btn{
        background-color:#997af0;
    color:white;
    padding:1rem 2rem;
    border:none;
    font-weight:bold;
    cursor:pointer;
    border-radius:0.4rem;
    font-size:1rem;
    text-transform:uppercase;
    &:hover:{
      background-color:#4e0eff;
    }
    }

    `

    export default Avatar ;
