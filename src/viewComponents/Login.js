import React,{useState} from 'react';
import '../App.css';
import axios from 'axios';
import google from '../icons8-google-plus-48.png';
import facebook from '../facebook.png'
import github from '../icons8-github-48.png';
import linkdin from "../icons8-linkedin-48.png"


import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { Grid ,Card,CardContent,Container} from '@material-ui/core';
import { Button,Box,Avatar,Typography } from '@material-ui/core';
import {FormHelperText} from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import { makeStyles,} from '@material-ui/core/styles';

import {Redirect} from 'react-router-dom';


const useStyles = makeStyles({
  root: {
    maxWidth: 395,
    borderRadius:10,
    boxShadow:"0 2px 4px rgba(0, 0, 0, .1), 0 8px 16px rgba(0, 0, 0, .1)",
  },
  title: {
    fontSize: 40,
    color:"rgb(0,128,255)"
  },
  sideFont:{
    fontSize:26,
    fontFamily:"Helvetica,Arial,sans-serif"
  },
  pos: {
    marginBottom: 12,
  },
  loginButton:{
    backgroundColor:"#1877f2",
    height:50,fontSize:"20px",
    fontFamily:"Helvetica,Arial,sans-serif",
    color:"whitesmoke"
  },
  createButton:{
    // marginLeft:80,marginRight:80,height:50,
    backgroundColor:"#42B72A",fontSize:"15px",
    color:"white",
    fontFamily:"Helvetica,Arial,sans-serif"
  },
  secondCard:{
    minWidth: 650,
  },
  textLogin:{
    backgroundColor:"#9f07b0",
    padding:25,
    margin:25
  }
});
 const Login = ()=> {
    const classes = useStyles();
    const [Email, setEmail] = useState('')
    const [Password, setPassword] = useState('')
    const [validEmail, setemailError] = useState({emailError:'',Error:false})
    const [validPassword,setPassowordError] = useState({passwordError:'',Perror:false})
    const [errorfromBackend, seterrorfromBackend] = useState('')
    const [addNewcontact,setNewcontact] = useState(false)
    const [resultMsg,setresultMsg] = useState('')

    const CheckingDialogue =()=>{
      setNewcontact(true)
    }

//inputs validating....
    const userValid = ()=>{
        if(!Email.includes("@") || !Email.includes('.')){
            setemailError({emailError:'please enter valid email',Eerror:Boolean(true)})
            return false;
        }
        setemailError({emailError:'',Eerror:Boolean(false)})

        if(Password.length<8){
            setPassowordError({passwordError:'please enter strong password',Perror:Boolean(true)})
            return false;
        }
        setPassowordError({passwordError:'',Perror:Boolean(false)})
        return true;
    }
    
// Details submiting.....
    const LoginSubmit = (e) =>{
        e.preventDefault();
        if(userValid()){
          const email = Email;
          const password = Password;
          const data = {
            email,password
          }
//using axios for posting data...          
          axios.post("http://13.232.32.187:3050/login",data)
          .then(responce=>{
            console.log(responce,"posting data....");  
            if(responce.data.result){
              seterrorfromBackend(responce.data.result)
              localStorage.setItem("login email",data.email)

            }else{
              console.log("wronggggg");
              setresultMsg("You have entered an invalid username or password")
            }
          })
          .catch(error=>{
            console.log(error,"errorrr...");  
          })
        }
    }

 
    return (
      <div>
        <Container maxWidth="sm">
            <Grid container >
            <Grid item>
            </Grid>
            <Grid item>
              
            <Card className={classes.root} variant="outlined">
            <Card elevation={12} className={classes.textLogin}>   
                          <Typography variant="h3" component="h2" style={{color:"whitesmoke"}}>Login</Typography>
            </Card>
              <Box style={{padding :10}} >
              <Grid container spacing={2}>
              <Grid item xs={6} >
                  <Box bgcolor="secondary.main" color="secondary.contrastText" p={1} justifyContent="space-around"> 
                  <a href="http://localhost:5000/auth/google"  style={{cursor:"pointer",textDecoration:"none",color:"white"}}>
                      <Grid container >
                        <Grid item xs={3}>
                            <Avatar alt="google" src="https://w7.pngwing.com/pngs/711/163/png-transparent-google-logo-google-cloud-platform-gboard-google-pay-4-company-service-logo.png" />
                        </Grid>
                            <Grid item xs={8}>
                              <Typography  variant="h6" component="h2">continue with google</Typography>
                            </Grid>
                      </Grid>
                    </a>
                    </Box>
                </Grid>
              
                <Grid item xs={6} >
                  <Box bgcolor="primary.main" color="primary.contrastText" p={1} justifyContent="space-around"> 
                  <a href="http://localhost:5000/auth/facebook"  style={{cursor:"pointer",textDecoration:"none",color:"white"}}>
                      <Grid container >
                        <Grid item xs={3}>
                            <Avatar alt="google" src={facebook} />
                        </Grid>
                            <Grid item xs={8}>
                              <Typography  variant="h6" component="h2">continue with fb</Typography>
                            </Grid>
                      </Grid>
                    </a>
                    </Box>
                </Grid>

                <Grid item xs={6} >
                    <Box bgcolor="black" color="primary.contrastText" p={1}>
                    <a href="http://localhost:5000/auth/github" style={{cursor:"pointer",textDecoration:"none",color:"white"}}>
                      <Grid container >
                        <Grid item xs={3}>
                            <Avatar alt="github" src={github} />
                        </Grid>
                        <Grid item xs={8}>
                          < Typography  variant="h6" component="h2">continue with github</Typography>
                        </Grid>
                      </Grid>
                      </a>
                    </Box>
                </Grid>

                <Grid item xs={6} >
                    <Box bgcolor="#003F67" color="primary.contrastText" p={1}>
                    <a href="http://localhost:5000/auth/linkdin" style={{cursor:"pointer",textDecoration:"none",color:"white"}}>
                      <Grid container >
                        <Grid item xs={3}>
                            <Avatar alt="linkdin" src={linkdin} />
                        </Grid>
                        <Grid item xs={8}>
                          < Typography  variant="h6" component="h2">continue with linkdin</Typography>
                        </Grid>
                      </Grid>
                      </a>
                    </Box>
                </Grid>
                </Grid>
                </Box>
                <p  >or login with email and password</p>
                <CardContent >
                <Typography variant="h6" component="h2" style={{color:"red"}}>{resultMsg}</Typography>
                    <FormControl fullWidth variant="outlined" size="small">
                        <InputLabel htmlFor="component-outlined">email</InputLabel>
                        <OutlinedInput
                        required
                            id="component-outlined"
                            label="email"
                            value={Email}
                            onChange={(e)=>setEmail(e.target.value)}
                            labelWidth={60}
                            error={Boolean(validEmail.emailError)}
                        /> 
                            <FormHelperText id="component-error-text"  style={{color:'red'}} >{validEmail.emailError}</FormHelperText>
                            <br />
                    </FormControl> 
  
                    <FormControl fullWidth variant="outlined" size="small">
                        <InputLabel htmlFor="component-outlined">password</InputLabel>
                        <OutlinedInput
                            id="component-password"
                            type="password"
                            label="password"
                            value={Password}
                            onChange={(e)=>setPassword(e.target.value)}
                            labelWidth={60}
                            error={Boolean(validPassword.Perror)}
                        /> 
                            <FormHelperText id="component-error-text"  style={{color:'red'}} >{validPassword.passwordError}</FormHelperText>
                    </FormControl>
                </CardContent>
                <CardActions>
                  <Button fullWidth variant="contained" size="large" 
                  className = {classes.loginButton}
                  onClick={LoginSubmit}
                  >
                      Log in
                  </Button>

                </CardActions>
                <br />
                
                <div className="line">

                  <hr />
                </div>
                <CardActions>
                  <Button fullWidth variant="contained" 
                  size="large"
                  className = {classes.createButton}
                  onClick={CheckingDialogue}
                  >
                  Create New Account
                  </Button>
                </CardActions>

            </Card>
            
          </Grid>
          </Grid>
        </Container>
            {addNewcontact ? <Redirect to ="/newuser" /> : null}
            {errorfromBackend ? <Redirect to = "/landingpage" /> : null}

      </div>
    )
}





export default Login;
