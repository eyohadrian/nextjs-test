import Amplify, {Auth} from 'aws-amplify';
import {useEffect} from "react";
import {awsCognitoConfig} from "./awsCognitoConfig";
import {useRouter} from "next/router";

Amplify.configure(awsCognitoConfig);

export const withAuth = Component => props => {
  const router = useRouter()

  async function signIn() {
    try {
      return await Auth.signIn('testx', 'Eseaene!1994');
    } catch (error) {
      return error
    }
  }

  useEffect(() => {
    //signIn().then(console.log).then(console.log);
    if (true) {
      router.push('/login');
    } else {
      router.push('/');
    }
  }, []);

  return <Component {...props}/>
}