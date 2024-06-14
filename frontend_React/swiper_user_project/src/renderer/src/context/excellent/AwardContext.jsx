import {createContext, useEffect, useState} from "react";
import axios from "axios";
import ip from '../../../../../dist/path.json';

export const AwardContext = createContext({});
export const AwardProvider = ({children}) => {
  const [award,setAward] = useState([]);

  const AwardWeekList = async () => {
    await fetch(`${ip.ip}/api/ea/list`,{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: 'Bearer ' + localStorage.getItem("login")
      }
    }).then(res => res.json()).then(res => {
      setAward(res.data)
    })
  }


  //시상식 이미지 가져오기
  let [imgAURL,setAURL] = useState([]);
  let imgURLArr = [];
  const AwardImgLoad = async () => {
    for(let i = 0; i<award.length; i++){
      await axios.get(`${ip.ip}/api/ea/urlImg?filename=${award[i]?.ea_picture || "8f42212e-430b-4688-8ef7-5f76bd308ab5_7a7bea65510cd62bacd6bfe0a4483abe.jpg"}`,{
        headers: {
          Authorization: 'Bearer ' + localStorage.getItem("login")
        },
        responseType: 'arraybuffer'
      }).then(res => {
        if(res.status === 200){
          const contentType = res.headers['content-type'];
          if (contentType && (contentType.startsWith('image/png') || contentType.startsWith('image/jpeg'))) {
            const imageBlob = new Blob([res.data], {type: contentType});
            const imageURL = URL.createObjectURL(imageBlob);
            imgURLArr.push({
              ea_idx: award[i].ea_idx,
              ea_picture: imageURL,
              start_month: award[i].start_month,
              type: 'image'
            });
          }
        }
      }).catch((e) => {
        console.log(e);
      })
    }
    return setAURL(imgURLArr);
  }

  useEffect(() => {
    AwardImgLoad();
  }, [award]);


  return(
    <AwardContext.Provider value={{
      AwardWeekList,
      award,setAward,
      imgAURL,setAURL
    }}>
      {children}
    </AwardContext.Provider>
  )
}
