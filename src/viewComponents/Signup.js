import React,{useState} from 'react';
import '../App.css';
import {Redirect,Link} from 'react-router-dom';
import axios from 'axios';

import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import { Grid ,Card,CardContent,Container,Typography} from '@material-ui/core';
import { Button } from '@material-ui/core';
import {FormHelperText} from '@material-ui/core';
import CardActions from '@material-ui/core/CardActions';
import { makeStyles,} from '@material-ui/core/styles';


const useStyles = makeStyles({
  root: {
    maxWidth: 395,
    borderRadius:10,
    boxShadow:"0 2px 4px rgba(0, 0, 0, .1), 0 8px 16px rgba(0, 0, 0, .1)",
  },
  title: {
    fontSize: 20,
    color:"white",
    textAlign:"center"

  },
  typo:{
    textAlign:"center",
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
    marginLeft:80,marginRight:80,height:50,
    backgroundColor:"#42B72A",fontSize:"15px",
    color:"white",
    fontFamily:"Helvetica,Arial,sans-serif"
  }
});
const Signup=()=> {
    const classes = useStyles();
    const [Username, setUsername] = useState('')
    const [Email, setemail] = useState('')
    const [Password, setPassword] = useState('')
    const [validEmail, setemailError] = useState({emailError:'',Error:false})
    const [validName, setNameError] = useState({nameError:'',redError:false})
    const [validPassword,setPassowordError] = useState({passwordError:'',Perror:false})
    const [signupMsgfromBackend, setsignupMsgfromBackend] = useState('')
    const [resultMsg,setresultMsg] = useState('')

 
// New user Details validating...
    const signUpvalid = ()=>{
        if(Username.length<4){
            setNameError({nameError:"your name must be 5 latters",redError:Boolean(true)})
            return false;
        }
        setNameError({nameError:"",redError:Boolean(false)})
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
    

    const SignupSubmit = (e) =>{
        if(signUpvalid()){
            const name = Username;
            const email = Email;
            const password = Password;
            const data = {
              name,email,password
            }
            console.log(data,"storing dataaaaaa");
            
            axios.post("http://13.232.32.187:3050/register",data)
            .then(responce=>
            {
              console.log(responce,"posting data....");
              if(responce.data.result){
                setsignupMsgfromBackend(responce.data.result)
              }else{
                console.log("wronggggg");
                setresultMsg("Username or email already exits.....")
              }
            })
            .catch(error=>
            {
              console.log(error,"errorrr...");
            })
          localStorage.setItem("login email",data.email)

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
                    <Card elevation={12} style={{width:300,height:100,marginLeft:50,marginBottom:30,backgroundColor:"#9f07b0"}}>
                          
                    <h3 className={classes.title}>Sign Up</h3>
                    </Card>
                    <Typography variant="h5" component="h3" className={classes.typo}>Create your account</Typography>
                    <CardContent >
                      <p style={{color:"red"}}>{resultMsg}</p>
                      <p style={{color:"red"}}>{signupMsgfromBackend}</p>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel htmlFor="component-outlined">Username</InputLabel>
                            <OutlinedInput
                            required
                                id="component-outlined"
                                label="Username"
                                value={Username}
                                onChange={(e)=>setUsername(e.target.value)}
                                labelWidth={60}
                                error={Boolean(validName.redError)}
                                style={{backgroundColor:"#f5f6f7"}}
                            /> 
                                <FormHelperText id="component-error-text"  style={{color:'red'}} >{validName.nameError}</FormHelperText>
                                <br />
                        </FormControl> 
                        
                      
                        <FormControl fullWidth variant="outlined">
                            <InputLabel htmlFor="component-outlined">email</InputLabel>
                            <OutlinedInput
                                id="component-email"
                                type="email"
                                label="email"
                                value={Email}
                                onChange={(e)=>setemail(e.target.value)}
                                labelWidth={60}
                                error={Boolean(validEmail.Eerror)}
                                style={{backgroundColor:"#f5f6f7"}}
                            /> <br />
                                <FormHelperText id="component-error-text"  style={{color:'red'}} >{validEmail.emailError}</FormHelperText>
                        </FormControl>
                        <FormControl fullWidth variant="outlined">
                            <InputLabel htmlFor="component-outlined">new password</InputLabel>
                            <OutlinedInput
                                id="component-password"
                                type="password"
                                label="new password"
                                value={Password}
                                onChange={(e)=>setPassword(e.target.value)}
                                labelWidth={60}
                                error={Boolean(validPassword.Perror)}
                                style={{backgroundColor:"#f5f6f7"}}
                            /> 
                                <FormHelperText id="component-error-text"  style={{color:'red'}} >{validPassword.passwordError}</FormHelperText>
                        </FormControl>
                    </CardContent>
                    <CardActions>
                    <Button fullWidth variant="contained" size="large" 
                    className = {classes.loginButton}
                    onClick={SignupSubmit}
                    >
                        sign Up
                    </Button>
                    </CardActions>
                    <div className="line">
                    <hr />
                    </div>
                  Already you have account? <Link to ="/" >Sign in</Link>
                  <br />
                  <br />
                  </Card>
                </Grid>

              </Grid>
          </Container>
          
          {signupMsgfromBackend ? <Redirect to ="/landingpage" />:null}
        </div>
    )
}

export default Signup;
