import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';

import './homepage.css';
import Latest from './Latest';
import * as albumsActions from '../../store/albums';

export const HomePage = () => {
    // const dispatch = useDispatch();
    // const newAlbums = useSelector((state) => state.albums.newestAlbumsList)

    // useEffect(() => {
    //     (async () => {
    //         await dispatch(albumsActions.getNewAlbums());
            
    //     })()
    // },[]);

    return (
        <div className="home-page">
            <div className="main-content__holder">
                <div className="main-content">
                    <div className="main-content__feature-holder">
                        <div 
                            className="main-content__feature"
                            style={{backgroundImage: `url(https://songcamp-preuploaded-images.s3-us-west-1.amazonaws.com/main01.jpeg)`}}
                        >
                            asdf
                        </div>
                    </div>
                    <div className="main-content__sub-feature-holder">
                        <div 
                            className="main-content__sub-feature"
                            style={{backgroundImage: `url(https://songcamp-preuploaded-images.s3-us-west-1.amazonaws.com/main02.jpeg)`}}
                        >
                            asdf
                        </div>
                        <div 
                            className="main-content__sub-feature"
                            style={{backgroundImage: `url(https://songcamp-preuploaded-images.s3-us-west-1.amazonaws.com/main03.jpeg)`}}
                        >
                            asdf
                        </div>
                        <div 
                            className="main-content__sub-feature"
                            style={{backgroundImage: `url(https://songcamp-preuploaded-images.s3-us-west-1.amazonaws.com/main04.jpeg)`}}
                        >
                            asdf
                        </div>
                    </div>
                </div>
            </div>
            <div className="rest-content__holder">
                <div className="rest-content">
                      <Latest />
                
                </div>
            </div>
        </div>
    )
}

export default HomePage;
