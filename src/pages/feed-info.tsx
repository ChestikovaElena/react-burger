import FeedInfoDetails from "../components/feed-info-details";
import styles from './feed-info.module.css';

export const FeedInfoPage = () => {
  return (
    <div className={ styles.wrapper }>
      <FeedInfoDetails />
    </div>
  )
}