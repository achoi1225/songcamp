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
                {/* <div className="discover__holder">
                    <div className="discover__header">DISCOVER</div>
                    <div className="discover">
                        {randomAlbums && randomAlbums.map((album) => {
                            return (
                                <div key={album.id} class="discover__album-holder">
                                    <div 
                                        className="discover__album"
                                        style={{backgroundImage: `url(${album.imgUrl})`}}
                                    >
                                    </div>
                                    <h6 className="discover__album-title">
                                        {album.title}
                                    </h6>
                                    <span className="discover__artist-name">
                                        {album.artist.artistName}
                                    </span>
                                </div>
                            )
                        })}
                    </div>
                </div> */}
                <div className="rest-content">
                      <Latest />
                
                </div>
            </div>
        </div>
    )
}

export default HomePage;
