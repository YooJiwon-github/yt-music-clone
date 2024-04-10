import { dummyAllSongList, getSongsBychannel, dummyPlaylistArray, getAllPlaylist, getPlaylistByOwner, getPlaylistById, getSongListTop10, dummyChannelList, getChannelById, homeCategoryList, dymmyGenreList } from '../lib/dummyData.js'
import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

const app = express();
app.use(cors());

const port = 8080;

app.use(bodyParser.json());

let playLists = [];
let channelList = [];

// channel로 노래목록 반환하는 엔드포인트
app.get('/api/songs/channel/:channelName', (req, res) => {
    const channelName = req.params.channel;
    const songs = getSongsBychannel(channelName);
    if (songs.length) {
        res.json(channelList);
    } else {
        res.status(404).json({ message: '해당 채널의 노래를 찾을 수 없습니다.'});
    }
});

// 모든 playlist들을 반환하는 엔드포인트
app.get('/api/all-playlists', (req, res) => {
    res.json(playLists);
});

// owner로 playlists 반환하는 엔드포인트
app.get('/api/playlists-owner/:owner', (req, res) => {
    const owner = req.params.owner;
    const playlists = getPlaylistByOwner(owner);
    if(playlists.length) {
        res.json(playLists);
    } else {
        res.status(404).json({ message: '해당 소유자의 플레이리스트를 찾을 수 없습니다.' });
    }
});

// id로 playlists 반환하는 엔드포인트
app.get('/api/playlists-id/:id', (req, res) => {
    const ID = parseInt(req.params.id);
    const playlists = getPlaylistById(ID);
    if(playlists.length) {
        res.json(playLists);
    } else {
        res.status(404).json({ message: '해당 id의 플레이리스트를 찾을 수 없습니다.' });
    }
});

// Top 10 리스트 반환하는 엔드포인트
app.get('/api/songs/top10', async (req, res) => {
    const top10Songs = await getSongListTop10();
    res.json(top10Songs);
});

// id로 channel 반환하는 엔드포인트
app.get('/api/channel/:id', (req, res) => {
    const ID = parseInt(req.params.id);
    const channelName = getChannelById(ID);
    if(channelName !== '') {
        res.json(channelList);
    } else {
        res.status(404).json({ message: '해당 id의 채널을 찾을 수 없습니다.' });
    }
});

// 노래를 플레이리스트에 추가하는 엔드포인트
app.post('/api/playlists/:playlistId/songs', (req, res) => {
    const playlistId = parseInt(req.params);
    const { name, channelId } = req.body;

    const playlist = dummyPlaylistArray.find(playlist => playlist.id === playlistId);
    if (!playlist) {
        return res.status(404).json({ message: '플레이리스트를 찾을 수 없습니다.'});
    }
    
    const song = dummyAllSongList.find(song => song.name === name && song.channelId === channelId);
    if (!song) {
        return res.status(404).json({ message: '해당 노래를 플레이리스트에서 찾을 수 없습니다.'});
    }
    
    // 노래를 플레이리스트에 추가
    if (!playlist.songList.some(existingSong => existingSong.name === name && existingSong.channelId == channelId)) {
        playlist.songList.push(song);
        return res.status(200).json({ message: '노래가 플레이리스트에 성공적으로 추가되었습니다.'});
    } else {
        return res.status(400).json({ message: '이미 플레이리스트에 노래가 존재합니다.'});
    }
});

app.listen(port, () => {
    console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
})
