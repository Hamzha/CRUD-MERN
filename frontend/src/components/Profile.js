import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { GetUserByID } from '../store/userSlice';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/esm/Container';

export default function UserProfile() {
  const { user, selectedUser } = useSelector(state => state.user);
  const dispatch = useDispatch();
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(GetUserByID({ token: user.token, id }))
  }, [dispatch, id, user])

  return <Container className='p-5'>
    <Card className=' align-center m-5 p-3'>
      <Card.Body className='p-4 '>
        {selectedUser && <>
          <div className='row'><p>Name: {selectedUser.name}</p></div>
          <div className='row'><p>Email: {selectedUser.email}</p></div>
          <div className='row'><p>Admin: {selectedUser.admin ? "True" : 'False'}</p></div>

          <Button onClick={() => {
            navigate('/user/edit/' + id)
              ()
          }}>Edit</Button>
        </>}
      </Card.Body>
    </Card>
  </Container>

}

