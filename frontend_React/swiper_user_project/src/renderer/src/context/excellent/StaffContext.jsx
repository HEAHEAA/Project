import {createContext, useEffect, useState} from "react";
import axios from "axios";
import ip from '../../../../../dist/path.json';

export const StaffContext = createContext({});
export const StaffProvider = ({children}) => {
  const [exList,setExList] = useState([]);

  const ExcellentWeekList = async () => {
    await fetch(`${ip.ip}/api/exmem/list`,{
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      }
    }).then(res => res.json()).then(res => {
      setExList(res.data)
    })
  }


  //우수사원 이미지 가져오기
  let [imgURL,setImgURL] = useState([]);
  let imgURLArr = [];
  const StaffImgLoad = async () => {
    for(let i = 0; i<exList.length; i++){
      await axios.get(`${ip.ip}/api/exmem/urlImg?filename=${exList[i]?.ex_em_picture || 'c7f7aeff-99c9-4a33-8465-ef132f9ba7bb_d664b27cca7eaf4d64c41622b5bb9b6c.jpg'}`,{
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
              ex_em_grade: exList[i].ex_em_grade,
              ex_em_idx: exList[i].ex_em_idx,
              ex_em_name: exList[i].ex_em_name,
              ex_em_part: exList[i].ex_em_part,
              ex_em_picture: imageURL,
              reg_date: exList[i].reg_date,
              start_month: exList[i].reg_date,
              type: 'image'
            });
          }
        }
      }).catch((e) => {
        console.log(e);
      })
    }
    return setImgURL(imgURLArr);
  }

  useEffect(() => {
    StaffImgLoad();
  }, [exList]);


  return(
    <StaffContext.Provider value={{
      ExcellentWeekList,
      exList,setExList,
      imgURL,setImgURL
    }}>
      {children}
    </StaffContext.Provider>
  )
}
