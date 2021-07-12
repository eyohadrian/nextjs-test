import {useEffect, useRef} from "react";
import {Auth} from "aws-amplify";
import {useRouter} from "next/router";

function Login ({env}) {

  const router = useRouter();
  const userRef = useRef();
  const passwordRef = useRef();

  useEffect(() => {
    if (env==="ENV") {
      router.push("/");
    }
  }, [])

  async function signIn() {
    return await Auth.signIn(userRef.current.value, passwordRef.current.value);
  }

  function onClick() {
    signIn().then(() => {
      router.push("/");
    }).catch(error => console.log(error));
  }

  return (
    <div>
      <input ref={userRef}/>
      <input ref={passwordRef}/>
      <button onClick={onClick}>Click</button>
    </div>
  )
}

export default Login

export async function getStaticProps() {

  return {
    props: {
      env: process.env.ENV
    }
  }
}