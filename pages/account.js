import { parseCookies } from 'nookies';
import React from 'react'

const account = (props) => {
  return (
    <div>
      <h1>Account</h1>
    </div>
  )
}

export function getServerSideProps(ctx) {
  const {token} = parseCookies(ctx);
  if(!token){
    const {res} = ctx
    res.writeHead(302,{Location: '/login'});
    res.end();
  }
  return{
    props: {
      token: {}
    }
  }
}

export default account
