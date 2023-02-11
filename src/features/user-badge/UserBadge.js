import styles from './UserBadge.module.css';

export default function UserBadge({ user={} }) {

  function handleSignIn() {
    //TODO: Sign In logic
  }

  function handleUserClick() {
    //TODO: Click User avatar logic
  }

  return (
    <div>
      {
        (user) ?
          <div className={styles.wrapper}>
            Hello Guest <button onClick={handleSignIn}>Sign In</button>
          </div>
          :
          <div className={styles.wrapper}>
            Hello {user?.name}
            <img
              className={styles.avatar}
              src={user?.imageUrl}
              alt='Avatar' 
              onClick={handleUserClick} />
          </div>
      }
    </div>
  )
}
