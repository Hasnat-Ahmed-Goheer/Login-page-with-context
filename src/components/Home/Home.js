import React,{useContext} from 'react';

import Card from '../UI/Card/Card';
import classes from './Home.module.css';
import AuthContext from '../../Context/auth-context';
import Button from '../UI/Button/Button';

const Home = (props) => {

  const context = useContext(AuthContext);
  return (
    <Card className={classes.home}>
      <h1>Welcome back!</h1>
      <Button onClick={context.onLogout} >Logout</Button>
    </Card>
  );
};

export default Home;