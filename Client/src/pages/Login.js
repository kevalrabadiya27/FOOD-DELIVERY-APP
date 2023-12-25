import styled from "styled-components"
import { mobile } from '../Responsive'
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../components/Loader'

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.unsplash.com/photo-1493770348161-369560ae357d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8MTR8fHxlbnwwfHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
 padding:20px;
 width:25%;
 border-radius:10px;
 background-color:white;
 -webkit-box-shadow: 12px 12px 24px #9499a8, -12px -12px -24px #ffffff;
 box-shadow: 14px 14px 24px #7a7c83;
 ${mobile({ width: '75%' })}
`
const Title = styled.h1`
 font-size:24px;
 font-weight:300;
`
const Form = styled.form`
  display:flex;
  flex-direction:column;

`
const Input = styled.input`
 flex:1;
 min-width:40%;
 padding:10px;
 font-size:17px;
 margin:10px 0px;
`
const Button = styled.button`
  width:40%;
  margin:8px 0px;
  border:none;
  padding:15px 20px;
  background-color:teal;
  color:white;
  cursor:pointer;
  border-radius:5px;
  &:disabled {
    color: green;
    cursor: not-allowed;
  }
`
const Links = styled.a`
  margin:10px 0px;
  font-size:14px;
  text-decoration:underline;
  cursor:pointer;
`
const Login = () => {
  let navigate = useNavigate();
  const[isLoading,setisLoading] = useState(false)
  const [credintial, setcredintial] = useState({
    email: "",
    password: ""
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setisLoading(true)
    try{
      const response = await fetch("https://food-delivery-api-9742.onrender.com/api/loginuser", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: credintial.email, password: credintial.password })
      });
      var ans = await response.json();
    }catch(e){
      toast.error(e)
    }finally{
      setisLoading(false)
    }
    if (!ans.sucess) {
      toast.error("Login failed");
    }
    if (ans.sucess) {
      localStorage.setItem("userEmail", credintial.email);
      localStorage.setItem("authToken", ans.authToken);
      toast.success("Sucessfully login");
      navigate("/");
    }
  }

  const handlechange = (e) => {
    setcredintial({ ...credintial, [e.target.name]: e.target.value });
  }
  return (
    <Container>
    {
      isLoading?<Loader/>:
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form onSubmit={handleSubmit}>
          <Input placeholder="username"
            type='Username' name="email" onChange={handlechange} value={credintial.email} />
          <Input placeholder="password"
            type='Password' name="password" onChange={handlechange} value={credintial.password} />
          <Button>LOGIN</Button>
          <Link to='/signup'>
            <Links>CREATE A NEW ACCOUNT</Links>
          </Link>
        </Form>
      </Wrapper>
    }
    </Container>
  )
}

export default Login