import React, { useEffect, useState } from 'react'
import userService from "../../services/user-service";
import { useParams } from "react-router";
import reviewService from '../../services/review-service';
import ReviewList from '../reviews/review-list';
import BookList from '../book-list';

const OtherProfile = () => {

  const { profileId } = useParams()
  const [currentUser, setCurrentUser] = useState({})
  const [otherUser, setOtherUser] = useState({})
  const [reviews, setReviews] = useState({})
  const [bookLists, setBookLists] = useState({})

  useEffect(() => {
    userService.profile()
      .then((currentUser) => {
        setCurrentUser(currentUser)
      })
  }, [])

  useEffect(() => {
    userService.getUserById(profileId)
      .then((user) => {
        setOtherUser(user)
      })
  }, [profileId])

  useEffect(() => {
    otherUser._id && reviewService.findReviewsForUser(otherUser._id).then(res => setReviews(res))
  }, [otherUser])

  useEffect(() => {
    otherUser._id && userService.getBookLists(otherUser._id).then(res => setBookLists(res))
  }, [otherUser])

  const updateUser = () => {
    userService.updateUser(otherUser._id, otherUser)
      .then((updatedUser) => {
        setOtherUser(updatedUser)
      })
  }

  return (
    <div>
      <h1>
        {otherUser.username}
      </h1>
      {
        currentUser.role === "ADMIN" &&
        <div>
          <form className="container-fluid">
            <div className="row mb-2">
              <label>Username</label>
              <input className="form-control"
                onChange={(e) => { setOtherUser({ ...otherUser, username: e.target.value }) }}
                value={otherUser.username}></input>
            </div>
            <div className="row mb-2">
              <label>Password</label>
              <input className="form-control"
                type="password"
                onChange={(e) => { setOtherUser({ ...otherUser, password: e.target.value }) }}
                value={otherUser.password}></input>
            </div>
            <div className="row mb-2">
              <label>First name</label>
              <input className="form-control"
                onChange={(e) => { setOtherUser({ ...otherUser, firstName: e.target.value }) }}
                value={otherUser.firstName}></input>
            </div>
            <div className="row mb-2">
              <label>Last name</label>
              <input className="form-control"
                onChange={(e) => { setOtherUser({ ...otherUser, lastName: e.target.value }) }}
                value={otherUser.lastName}></input>
            </div>
            <div className="row mb-2">
              <label>Email</label>
              <input className="form-control"
                type="email"
                onChange={(e) => { setOtherUser({ ...otherUser, email: e.target.value }) }}
                value={otherUser.email}></input>
            </div>
            <div className="row mb-4">
              <label>Role</label>
              <select className="form-control"
                onChange={(e) => { setOtherUser({ ...otherUser, role: e.target.value }) }}
                value={otherUser.role}
                disabled={otherUser.role === "ADMIN" && "disabled"}>
                <option value="none" className="selected disabled hidden" />
                <option value="GENERAL_USER">General User</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>
            <div className="row mb-4 justify-content-between">
              <button className="btn btn-primary"
                onClick={updateUser}>
                Update
                </button>
            </div>
          </form>
        </div>
      }
      {
        otherUser && otherUser.username &&
        (<div className="pb-4">
          <h2 className="h3">
            Reviews by {otherUser && otherUser.username}
          </h2>
          <ReviewList reviews={reviews} currentUser={currentUser} />
          <h2 className="h3">
            Booklists by {otherUser && otherUser.username}
          </h2>
          {!!bookLists.length ? bookLists.map(b => <BookList currentUser={currentUser} bookList={b} key={b.name} />) : <div>No booklists here!</div>}
        </div >)
      }

      {/* {JSON.stringify(user)} */}
      {/* {JSON.stringify(bookLists)} */}
      {/* {JSON.stringify(reviews)} */}
      {/*  TODO GetUser*/}
    </div >
  )
}

export default OtherProfile