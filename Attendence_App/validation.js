
//function that validate email using regex
 export function ValidateEmail(email) 
  {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email) && email != "")
    {
      return true;
    }
    return "Please provide a valid Email. \n";
  }

  //Validate password using Regex -- like pattern -- one digit,one capial,one small range between 6-20.
  export function ValidatePassword(password){
    if(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/.test(password) && password != ""){
      return true;
    }
    return "password muat contain One capital letter,One digit and one samll letter. \n";
  }

  //check if password is empty
  export function needPassword(password){
    if(password == undefined || password == "" || password == null){
      return "Password should not be left blank . \n" ;
    }
    return true;
  }

  export function needEmail(email){
    if (email == "" || email == undefined || email == null){
      return "email should not be left blank. \n";
    } 
    return true;
  }

  export function validateConfirmPassword(password,confirmPassword){
    if(password != confirmPassword  ){
      return "Password and confirm passsword dosent Matched.\n" ;
    }
    return true;
  }
