import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

import './artist-signup-page.css';
import * as genreActions from "../../store/genres";
import * as sessionActions from "../../store/session";


const ArtistSignupForm = () => {
    const [artistName, setArtistName] = useState("");
    const [genre, setGenre] = useState("");
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const genreList = useSelector((state) => state.genres.list);
    const [errors, setErrors] = useState([]);
    const isArtist = true;
    const bio = null;
    const imgUrl = null;
    // const genre= null;
    // const follows = useSelector((state) => state.follows.list);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
        dispatch(genreActions.getGenres());
    }, []);

    const updateProperty = (property) => (e) => {
        console.log(e.target.value)
        property(e.target.value);
    }

    const handleClose = (e) => {
        console.log('close')
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
   
        const payload = {
            email,
            userName,
            password,
            artistName,
            genre,
            isArtist,
            imgUrl,
            bio,
        }

        if (password === confirmPassword) {
            setErrors([]);
            return dispatch(sessionActions.artistSignup(payload))
                .catch((res) => {
                    if (res.data && res.data.errors) setErrors(res.data.errors);
            });
        }
        return setErrors(['Confirm Password field must be the same as the Password field']);
        // history.replace("/dashboard");
    }

    // if(!genreList) {
    //     return null;
    // }

    return (
        <div className="artist-signup-form__holder">
            <div className="artist-signup-form__content">
                <div className="artist-signup-form__header-container">
                    <h3 className="signup-form-header">Sign up for a Songcamp artist account</h3> <span onClick={handleClose} className="signup-form-close-btn">x</span>
                </div>
                <form className="artist-signup-form">
                    <ul>
                        {errors.map((error, idx) => <li key={idx}>{error}</li>)}
                    </ul>
                    <label>Artist/Band name</label>
                    <input type="text" name="artistName" placeholder={artistName} value={artistName} onChange={updateProperty(setArtistName)} />
                    <label>Genre</label>
                    <select onChange={updateProperty(setGenre)}>
                        <option>-- choose a genre --</option>
                        {genreList && genreList.map((genre) => (
                            <option key={genre.id}>{genre.type}</option>
                        ))}
                    </select>
                    <label>Username</label>
                    <input type="text" name="username" placeholder={userName} value={userName} onChange={updateProperty(setUserName)} />
                    <label>Email address</label>
                    <input name="email" placeholder={email} value={email} onChange={updateProperty(setEmail)}/>
                    <label>Password</label>
                    <input type="password" name="password" placeholder={password} value={password} onChange={updateProperty(setPassword)}/>
                    <label>Confirm password</label>
                    <input type="password" name="confirmPassword" placeholder={confirmPassword} value={confirmPassword} onChange={updateProperty(setConfirmPassword)}/>
                    <button onClick={handleSubmit}>Sign up</button>
                </form>
            </div>
        </div>
    )
}

export default ArtistSignupForm;