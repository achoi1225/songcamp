import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';

import './homepage.css';
import Latest from './Latest';
import * as albumsActions from '../../store/albums';

export const HomePage = () => {
    const dispatch = useDispatch();
    const randomAlbums = useSelector((state) => state.albums.randomAlbumsList)

    useEffect(() => {
        (async () => {
            await dispatch(albumsActions.getRandomAlbums());
        })()
    },[]);

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
                <div className="discover__holder">
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
                </div>
                <div className="rest-content">
                      <Latest />
                
                </div>
            </div>
        </div>
    )
}

export default HomePage;
