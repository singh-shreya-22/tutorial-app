import express from 'express';
import AuthenticationOperations from './authOperations.ts';
const app = express();
const PORT = 3000;
import cors from 'cors';
import { AuthenticationError} from './error.ts';

const authOps = new AuthenticationOperations();

app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true, // if you need cookies/auth headers
}));

// Root route
app.get('/', (req, res) => {
  console.log("Received request with body ",req.body);
  res.send('Hello from TypeScript Express 🚀');
});

// app.post("/", (req, res) => {
//   console.log("Received request with body ",req.body);  
// });

app.post('/auth/signup', async (req, res) => {
  console.log("Request received");
  console.log(req.body);
  
  const { email, password, name} = req.body;
  // Here you would typically hash the password and save the user to the database
  try{
    console.log(email, password, name)
    const userId = await authOps.handleSignUpRequest(email, password, name);
    console.log("User with email ", email, " created with ID: ", userId);
    res.status(200).json({ message: 'User created successfully', user: { email, userId, name} });
  }
  catch(error){
    if(error instanceof AuthenticationError)
      res.status(error.statusCode).json({message: error.message, errorName: error.name})
    else 
      res.status(500).json({message: 'internal server error', errorName: 'InternalServerError'})
  }
  
});

app.post('/auth/signin', async(req, res) => {
  console.log("Request received.")
  console.log(req.body)

  const {email, password, name} = req.body;

  try{
    const [isSignInSuccessful, userId, username, message] = await authOps.handleSignInRequest(email, password)
    console.log(`The request status: ${isSignInSuccessful} for userId: ${userId} and username: ${username} with message: ${message}`)
    if(isSignInSuccessful){
      console.log("Successful sign-in.")
      res.status(200).json({userId: userId, usermail: email, username: username})
    }
    else{
      console.log("unauthorized access.")
      res.status(401).json({message: message})
    }
  }
  catch(error){
    console.log("error during handling signin request: ", error)
    res.status(500).json({message: "Internal Server Error"})
  }
})



// Mount user routes
// app.use('/users', userRouter);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
