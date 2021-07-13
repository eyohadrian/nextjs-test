import {useEffect, useRef} from "react";
import {Auth} from "aws-amplify";
import {useRouter} from "next/router";
import {ROOT} from "../misc/constants/routes";

function Login ({env}) {

  const router = useRouter();
  const userRef = useRef();
  const passwordRef = useRef();

  useEffect(() => {
    if (env === "PROD") {
      router.push(ROOT);
    }
  }, [])

  async function signIn() {
    return await Auth.signIn(userRef.current.value, passwordRef.current.value);
  }

  function onClickSignIn() {
    signIn().then(() => {
      router.push(ROOT);
    }).catch(error => console.log(error));
  }

  async function signOut() {
    try {
      await Auth.signOut();
    } catch (error) {
      console.log('error signing out: ', error);
    }
  }

  function onClickSignOut() {
    signOut();
  }

  return (
    <div>
      <input ref={userRef}/>
      <input ref={passwordRef}/>
      <button onClick={onClickSignIn}>Click</button>
      <button onClick={onClickSignOut}>Sign Out</button>
    </div>
  )
}

export default Login

export async function getStaticProps() {

  return {
    props: {
      env: process.env.NEXT_PUBLIC_ENV
    }
  }
}