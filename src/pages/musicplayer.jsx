import React, { useState, useEffect } from "react"
import { Play, Pause, SkipForward, SkipBack, Music } from 'lucide-react'
import './musicplayer.css'

const MusicPlayer = () => {
    const [songList, setSongList] = useState([])
    const [currentSong, setCurrentSong] = useState(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(0)
    const [audio] = useState(new Audio())
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)

    useEffect(() => {
        fetchSongs()
    }, [])

    useEffect(() => {
        if (currentSong) {
            audio.src = `https://api.kimrasng.me/api/music-server/music/${currentSong.filename}`
            audio.play()
            setIsPlaying(true)
        }
        return () => {
            audio.pause()
        }
    }, [currentSong])

    useEffect(() => {
        if (isPlaying && currentSong) {
            audio.play()
        } else {
            audio.pause()
        }
    }, [isPlaying])

    useEffect(() => {
        const updateProgress = () => {
            setCurrentTime(audio.currentTime)
            setDuration(audio.duration)
        }

        const handleSongEnd = () => {
            if (songList.length > 0) {
                const nextIndex = (currentIndex + 1) % songList.length
                setCurrentIndex(nextIndex)
                setCurrentSong(songList[nextIndex])
            }
        }

        audio.addEventListener('timeupdate', updateProgress)
        audio.addEventListener('ended', handleSongEnd)

        return () => {
            audio.removeEventListener('timeupdate', updateProgress)
            audio.removeEventListener('ended', handleSongEnd)
        }
    }, [audio, currentIndex, songList])

    const fetchSongs = async () => {
        const res = await fetch(`https://api.kimrasng.me/api/music-server/songs`)
        const data = await res.json()
        setSongList(data.songs)
    }

    const playSong = (song, index) => {
        setCurrentSong(song)
        setCurrentIndex(index)
    }

    const togglePlayPause = () => {
        if (currentSong) {
            setIsPlaying(!isPlaying)
        }
    }

    const playNext = () => {
        if (songList.length > 0) {
            const nextIndex = (currentIndex + 1) % songList.length
            setCurrentIndex(nextIndex)
            setCurrentSong(songList[nextIndex])
        }
    }

    const playPrevious = () => {
        if (songList.length > 0) {
            const prevIndex = (currentIndex - 1 + songList.length) % songList.length
            setCurrentIndex(prevIndex)
            setCurrentSong(songList[prevIndex])
        }
    }

    const handleProgressChange = (e) => {
        const newTime = e.target.value
        audio.currentTime = newTime
        setCurrentTime(newTime)
    }

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60)
        const secs = Math.floor(seconds % 60)
        return `${mins}:${secs.toString().padStart(2, '0')}`
    }

    const progressPercent = duration ? (currentTime / duration) * 100 : 1

    return (
        <div className="music-player">
            {currentSong && (
                <div
                    className="background-blur"
                    style={{ backgroundImage: `url(https://api.kimrasng.me/api/music-server/img/song/${currentSong.image_filename})` }}
                />
            )}
            <div className="player-container">
                <div className="content">
                    <div className="current-song">
                        <div className="song-details">
                            {currentSong ? (
                                <img
                                    src={`https://api.kimrasng.me/api/music-server/img/song/${currentSong.image_filename}`}
                                    alt={currentSong.title}
                                    className="song-image"
                                />
                            ) : (
                                <div className="empty-image">
                                    <Music size={64} color="rgba(255,255,255,0.5)" />
                                </div>
                            )}

                            <div className="song-info">
                                <div className="text-center">
                                    <h2>{currentSong?.title || "재생 중인 곡 없음"}</h2>
                                    <p>{currentSong?.artist_name || "음악을 선택해주세요"}</p>
                                </div>

                                <div className="progress-container">
                                    <div
                                        className="progress-bar-background"
                                        onClick={(e) => {
                                            const rect = e.target.getBoundingClientRect()
                                            const offsetX = e.clientX - rect.left
                                            const newTime = (offsetX / rect.width) * duration
                                            audio.currentTime = newTime
                                            setCurrentTime(newTime)
                                        }}
                                    >
                                    <div
                                        className="progress-bar-foreground"
                                        style={{ width: `${progressPercent}%` }}
                                    />
                                    </div>
                                    <div className="time-display">
                                        <span>{formatTime(currentTime)}</span>
                                        <span>{formatTime(duration)}</span>
                                    </div>
                                </div>

                                <div className="controls">
                                    <button onClick={playPrevious} className="control-button">
                                        <SkipBack size={24} />
                                    </button>
                                    <button onClick={togglePlayPause} className="play-button">
                                        {isPlaying ? <Pause size={32} /> : <Play size={32} />}
                                    </button>
                                    <button onClick={playNext} className="control-button">
                                        <SkipForward size={24} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="song-list">
                        <div className="list-container">
                            {songList.map((song, index) => (
                                <div
                                    key={song.id}
                                    onClick={() => playSong(song, index)}
                                    className={`song-item ${currentSong?.id === song.id ? 'active' : ''}`}
                                >
                                    <img
                                        src={`https://api.kimrasng.me/api/music-server/img/song/${song.image_filename}`}
                                        alt={song.title}
                                    />
                                    <div className="item-info">
                                        <h3>{song.title}</h3>
                                        <p>{song.artist_name}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MusicPlayer
