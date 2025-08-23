import AuthenticationOperations from "./authOperations.ts";

const authOps = new AuthenticationOperations();

authOps.handleSignInRequest("admin", "123").then((response)=>{
    console.log(response)
}).catch((err)=>{
    console.log(err)
})