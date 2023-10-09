import React, {Component} from "react";
import ReactPlayer from 'react-player'
import {BLANK_PLAYLIST, ENGLISH, SOUND_OFF} from "../../config/Constants";

class AudioPlayerElement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playlist: this.props.playlist,
            currentTrackNo: 0,
            lastTrack: null,
            stateTrack:false
        }
        this.handlePlayNext = this.handlePlayNext.bind(this);
    }

    handlePlayNext() {
        console.log("handlePlayNext");
        let playlist = this.state.playlist;
        let currentTrackNo = this.state.currentTrackNo;
        if (playlist.length > currentTrackNo) {
            if (this.state.lastTrack === BLANK_PLAYLIST[ENGLISH]) {
                this.setState({currentTrackNo: currentTrackNo + 1});
                this.setState({lastTrack: this.props.playlist[currentTrackNo + 1]});
            } else if (playlist[currentTrackNo] === playlist[currentTrackNo + 1]) {
                this.setState({lastTrack: BLANK_PLAYLIST[ENGLISH]});
            } else {
                this.setState({currentTrackNo: currentTrackNo + 1});
                this.setState({lastTrack: this.props.playlist[currentTrackNo + 1]});
            }
        }
    }

    render() {
        let trackNo = this.state.currentTrackNo;
        if (this.props.audioIndex !== null) {
            trackNo = this.props.audioIndex;
        }
        let audioSrc = process.env.PUBLIC_URL + "/" + this.props.playlist[trackNo];
        if (this.state.lastTrack === BLANK_PLAYLIST[ENGLISH]) {
            audioSrc = process.env.PUBLIC_URL + "/" + BLANK_PLAYLIST[ENGLISH];
        }
        let status = true;
        if (this.props.sound === SOUND_OFF) {
            status = false;
        }
        // console.log(audioSrc,status)
        return (
            <ReactPlayer
                onEnded={this.handlePlayNext}
                url={audioSrc}
                playing={status}
                height={0}
                width={0}
            />
        );
    }

}

export default AudioPlayerElement;
