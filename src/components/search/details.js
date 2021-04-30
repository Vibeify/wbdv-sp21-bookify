import React, {useState, useEffect} from "react";
import {Link, useParams} from 'react-router-dom'
import bookService from '../../services/book-service'
import parse from "html-react-parser"
import styles from './details.module.scss'
import { Fragment } from "react";
import reviewService from "../../services/review-service";
import ReviewList from "../reviews/review-list";
import ReviewForm from "../reviews/review-form";
import userService from "../../services/user-service";

const Details = ({ bid, summary }) => {

  const { bookId } = useParams()
  const bookNo = bid || bookId
  const [book, setBook] = useState({})
  const [cover, setCover] = useState("")
  const [reviews, setReviews] = useState({})

  const [currentUser, setCurrentUser] = useState({})

  useEffect(() => {
    userService.profile()
      .then(user => {
        setCurrentUser(user)
      })
  }, [])

  useEffect(() => {
    bookService.findBookById(bookNo)
      .then(result => {
        if (result.volumeInfo) {
          setBook(result.volumeInfo)
          setCover(result.volumeInfo.imageLinks)
        } else {
          !result.volumeInfo && setBook(result)
        }
      })
    reviewService.findReviewsForBook(bookNo)
      .then(result => {
        setReviews(result)
      })
  }, [bookNo])


  if (!book) {
    return null;
  }

  // console.log(book)

  if (book.error) {
    return (<div>We're having trouble finding this book</div>)
  }

  return(
    <div className={`${styles["details"]} row`}>
      <div className="col-9 col-md-3 mb-4">
        {
          cover && <img className="img-fluid" src={cover.medium || cover.small || cover.thumbnail} alt={`Book cover for "${book.title}"`} />
        }
      </div>
      <div className={`col-12 col-md-9 ${summary &&  styles['summary'] + ' overflow-hidden position-relative'}`}>
        <h1>{book.title}</h1>
        <h3 className={`small-heading font-italic mt-4 ${summary ? 'text-light' : 'text-primary'}`}>By: {book.authors || 'Unknown'}</h3>
        {summary && (<div className=" position-relative">
            <Link className="btn btn-primary mt-2" to={`/details/${bookNo}`}>Learn more</Link>
          </div>)}
        {book.description &&
          summary ?
          <div className="d-none d-md-block">
            <h3 className="small-heading mt-4">Synopsis:</h3>
            <div className={styles["book-description"]}>
              <div className={`${summary && 'position-absolute pr-4'} `}>
                {parse(book.description || "")}
              </div>
            </div>
          </div>
          :
          (<Fragment>
            <h3 className="small-heading mt-4">Synopsis:</h3>
            <div className={styles["book-description"]}>
              <div>
                {parse((book?.description || ""))}
              </div>
            </div>
          </Fragment>)}
        {!summary && (<div>
          <h3 className="small-heading mt-4">Reviews</h3>
          {currentUser && currentUser._id && <ReviewForm userId={currentUser._id} />}
          {reviews.length ? <ReviewList reviews={reviews} /> :
            <div>Be the first to leave a review!</div>
          }
        </div>)}
      </div>
</div>
  )
}
export default Details