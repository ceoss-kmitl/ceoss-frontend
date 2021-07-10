import styles from './HomePage.module.css'
import { Button } from 'components/Button'

export const HomePage = () => {
  return (
    <div>
      <h1 className={styles.headerRed}>Hello world!</h1>
      <Button>Do not press</Button>
    </div>
  )
}
