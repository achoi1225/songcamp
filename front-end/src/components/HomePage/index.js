import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';

import './homepage.css';
import DiscoverSection from './DiscoverSection';
import Latest from './Latest';
import * as albumsActions from '../../store/albums';

export const HomePage = () => {
    const dispatch = useDispatch();
    // const randomAlbums = useSelector((state) => state.albums.randomAlbumsList)

    // useEffect(() => {
    //     (async () => {
    //         await dispatch(albumsActions.getRandomAlbums());
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
                            <div className="main-content__feature-description-holder">
                                <div className="main-content__feature-description-header">
                                    consectetur adipiscing
                                </div>
                                <div className="main-content__feature-description">
                                    In non velit eu dolor iaculis ultrices et ac dolor
                                </div>  
                            </div>
                        </div>
                    </div>
                    <div className="main-content__sub-feature-holder">
                        <div 
                            className="main-content__sub-feature"
                            style={{backgroundImage: `url(https://songcamp-preuploaded-images.s3-us-west-1.amazonaws.com/main02.jpeg)`}}
                        >
                            <div className="main-content__sub-feature-description-holder">
                                <div className="main-content__sub-feature-description-header">
                                    Quisque quis
                                </div>
                                <div className="main-content__sub-feature-description">
                                    Nulla in pretium eros.
                                </div>  
                            </div>
                        </div>
                        <div 
                            className="main-content__sub-feature"
                            style={{backgroundImage: `url(https://songcamp-preuploaded-images.s3-us-west-1.amazonaws.com/main03.jpeg)`}}
                        >
                            <div className="main-content__sub-feature-description-holder">
                                <div className="main-content__sub-feature-description-header">
                                    Quisque quis
                                </div>
                                <div className="main-content__sub-feature-description">
                                    Nulla in pretium eros.
                                </div>  
                            </div>
                        </div>
                        <div 
                            className="main-content__sub-feature"
                            style={{backgroundImage: `url(https://songcamp-preuploaded-images.s3-us-west-1.amazonaws.com/main04.jpeg)`}}
                        >
                            <div className="main-content__sub-feature-description-holder">
                                <div className="main-content__sub-feature-description-header">
                                    Quisque quis
                                </div>
                                <div className="main-content__sub-feature-description">
                                    Nulla in pretium eros.
                                </div>  
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="rest-content__holder">
                <DiscoverSection />
                <Latest />
            </div>
        </div>
    )
}

export default HomePage;
