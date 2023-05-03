import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components"
import { mobile } from '../Responsive'
import { toast } from 'react-toastify'
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    ),
    url("https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxleHBsb3JlLWZlZWR8NHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60")
      center;
  background-size: cover;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Wrapper = styled.div`
 padding:20px;
 width:40%;
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
  flex-wrap:wrap;
`
const Input = styled.input`
 flex:1;
 min-width:40%;
 padding:10px;
 font-size:17px;
 margin:20px 10px 0px 0px;
`
const Agreement = styled.span`
 font-size:16px;    
 margin:20px 0px
`
const Button = styled.button`
  width:40%;
  border:none;
  padding:15px 20px;
  background-color:teal;
  color:white;
  cursor:pointer;
`

const Register = () => {
    let navigate = useNavigate();
    const [credintial, setcredintial] = useState({
        name: "",
        email: "",
        password: "",
        location: ""
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("https://food-delivery-api-9742.onrender.com/api/createuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name: credintial.name, email: credintial.email, password: credintial.password, location: credintial.location })
        });
        const ans = await response.json()
        if (!ans.sucess) {
            alert("incorrect data")
        } else {
            localStorage.setItem("authToken", ans.authToken);
            toast.success("Registation Sucessfully!")
            navigate("/");
        }
    }

    const handlechange = (e) => {
        setcredintial({ ...credintial, [e.target.name]: e.target.value });
    }
    return (
        <>
            <Container>
                <Wrapper>
                    <Title>CREATE AN ACCOUNT</Title>
                    <Form onSubmit={handleSubmit}>
                        <Input placeholder="name" name="name" value={credintial.name} onChange={handlechange} />
                        <Input placeholder="Address" name="location" value={credintial.location} onChange={handlechange} />
                        <Input placeholder="gmail" name="email" value={credintial.email} onChange={handlechange} />
                        <Input placeholder="password" name="password" value={credintial.password} onChange={handlechange} />
                        <Agreement>By creating an account,I consent to the processing of my personal data in accordance the <b>PRIVACY POLICY</b></Agreement>
                        <Button>CREATE</Button>
                        <Link to='/login' className="m-3 btn btn-danger">Already Register user</Link>
                    </Form>
                </Wrapper>
            </Container>
        </>
    )
}

export default Register