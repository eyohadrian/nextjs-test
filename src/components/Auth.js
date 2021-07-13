import Amplify, {Auth} from "aws-amplify";
import {awsCognitoConfig} from "./awsCognitoConfig";
import React, {Fragment, useCallback, useEffect, useState} from "react";
import {useRouter} from "next/router";
import {LOGIN, ROOT} from "../misc/constants/routes";

Amplify.configure(awsCognitoConfig);

function RouterAuth({children}) {
  const router = useRouter();
  const [session, setSession] = useState();

  useEffect(() => {
    Auth.currentSession().then(c => {
      console.log("Session", c);
      setSession(() => c);
    }).catch(e => console.log(e));
    return () => {
      console.log("Auth component un-mounted");
    }
  }, []);

  useEffect(() => {
    if (router.pathname !== LOGIN && !session) {
      router.push(LOGIN);
    }

    if (router.pathname === LOGIN && !!session) {
      console.log("WHASA");
      router.push(ROOT);
    }
  }, [router, session])

  const Component = useCallback(() => {
    if (router.pathname === LOGIN && !session) {
      return (<Fragment>{children}</Fragment>);
    }

    if (router.pathname === LOGIN && !!session) {
      return <div>Redirecting</div>
    }

    if (router.pathname !== LOGIN && !session) {
      return <div>Redirecting</div>
    }

    if (router.pathname !== LOGIN && !!session) {
      return (<Fragment>{children}</Fragment>);
    }
  }, [router, session])

  return <Component/>
}

export default function Authentication({children, env}) {
  return env === "PROD"
    ? <Fragment>{children}</Fragment>
    : (
      <RouterAuth>
        {children}
      </RouterAuth>
      )
}

