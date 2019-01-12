import React from 'react';
import './User.css';

const Users = props => {
  const { username, avatar_url, name } = props.user;
  return (
    <main className='content-well'>
      <article className='userCard'>
        <section className='userCard__avatarContainer'>
          <img src={avatar_url} alt='user_avatar' className='user_avatar' />
        </section>
        <section className='userCard__textContainer'>
          <h1 className='userName'>{name}</h1>
          <h2 className='userHandle'>@{username}</h2>
        </section>
      </article>
    </main>
  );
};

export default Users;
