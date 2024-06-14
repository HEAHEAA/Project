import { createContext, useEffect, useState } from 'react'
import axios from 'axios'
import { NodeId, path } from "./path/myPath";

export const PlayContext = createContext({})
export const PlayProvider = ({ children }) => {
  //1. 전체 파일 리스트
  const [fileList, setFileList] = useState([]);

  const GetFileList = async () => {
    await fetch(`${path}/api/playlist`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => res.json())
      .then((res) => {
        setFileList(res.data)
      })
  }

  //2.재생중인 파일리스트
  const [playList, setPlayList] = useState([])

  const PlayListOnsubmit = async () => {
    await fetch(`${path}/api/did/list/${localStorage.getItem('node')}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => res.json())
      .then((res) => {
        setPlayList(res.data)
      })
  }

  //1-1. 파일리스트 -> 재생리스트 추출

  //1-1-1. 재생목록 list id 추출
  let arr = playList && playList[0]?.file_list
  let re01 = arr?.replace('{', '')
  let re02 = re01?.replace('}', '')
  let re03 = re02?.replaceAll('"', '')
  let playLists = re03?.split(',')
  let playResult = []
  for (let i = 0; i < playLists?.length; i++) {
    playResult.push({ idx: parseInt(playLists[i]) })
  }

  //1-1-2. 재생목록 러닝타임 추출
  let arr01 = playList && playList[0]?.running_time
  let ar01 = arr01?.replace('{', '')
  let ar02 = ar01?.replace('}', '')
  let ar03 = ar02?.replaceAll('"', '')
  let playList01 = ar03?.split(',')

  let playTimeResult = []
  for (let i = 0; i < playLists?.length; i++) {
    playTimeResult.push({ running_time: parseInt(playList01[i]) })
  }

  ///////2. 이미지 재생

  const [swiperIdx, setSwiperIdx] = useState(0)

  //2-1. 현재 재생 파일 내용추출
  let idx = []
  let id = []
  for (let i = 0; i < fileList.length; i++) {
    idx.push(fileList[i])
  }
  for (let i = 0; i < playLists?.length; i++) {
    // id.push(parseInt(playLists[i]))
    id.push({
      id:parseInt(playLists[i]),
      time: parseInt(playList01[i])
    });
  }


  //3. drag&drop 으로 섞이는 배열값 감안하여  includes 대신 이중 반복문 사용.
  let result = [];
  for (let j = 0; j < id.length; j++) {
    for (let i = 0; i < idx.length; i++) {
      if (id[j].id === idx[i].idx) {
        result.push({
          idx: idx[i].idx,
          origin_fileName: idx[i].origin_fileName,
          reg_date: idx[i].reg_date,
          upload_fileName: idx[i].upload_fileName,
          time: id[j]?.time
        });
      }
    }
  }



  const [type,setType] = useState('');
  const [url,setUrl] = useState('');

  let len = [];
  let typeLen = []

  useEffect(()=>{
    MediaVideo();
  },[fileList,playList]);
  useEffect(()=>{
    MediaVideo();
  },[]);



  const MediaVideo = async () => {
    for(let i=0; i<result.length; i++){
      await axios.get(`${path}/api/did/files`,{
        params: {
          filename: result[i]?.upload_fileName|| 'd56492e6-80bc-46ec-a7a2-fa4e905578bc_양산시-배출가스.jpg'
        },
        responseType: 'arraybuffer'
      }).then((res) => {
        if(res.status === 200){
          const contentType = res.headers['content-type'];
          typeLen.push(res.headers['content-type']);
          //동영상인 경우
          if (contentType && contentType.startsWith('application/octet-stream')) {
            const videoBlob = new Blob([res.data], {type: 'video/mp4'});
            const videoURL = URL.createObjectURL(videoBlob);
            len.push({
              type: 'video',
              mediaUrl: videoURL
            });
            setType('video');
          }
          //이미지인 경우
          else if (contentType && (contentType.startsWith('image/png') || contentType.startsWith('image/jpeg'))) {
            const imageBlob = new Blob([res.data], {type: contentType});
            const imageURL = URL.createObjectURL(imageBlob);

            len.push({
              type: 'image',
              mediaUrl: imageURL
            });
            setType('image');
          }
        }
      }).catch((e) => {
        console.log(e);
      });
    }
    setUrl(len);
  }

  return (
    <PlayContext.Provider
      value={{
        fileList,
        setFileList,
        GetFileList,
        PlayListOnsubmit,
        MediaVideo,
        playTimeResult,
        result,
        swiperIdx,
        setSwiperIdx,
       type,setType,
       url,setUrl,

      }}
    >
      {children}
    </PlayContext.Provider>
  )
}
