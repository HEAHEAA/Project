import axios from "axios";
import {useEffect, useState} from "react";

function Test() {
    const arr = [
        {
            idx: 2,
            origin_fileName: "꽃.mp4",
            upload_fileName: "bc3d914f-b9d7-42c9-8dc1-b72961a8a529_꽃.mp4",
            reg_date: "2023-11-22 06:16:26"
        },
        {
            idx: 6,
            origin_fileName: "양산시-배출가스.jpg",
            upload_fileName: "d56492e6-80bc-46ec-a7a2-fa4e905578bc_양산시-배출가스.jpg",
            reg_date: "2023-11-22 08:31:32"
        },
        {
            idx: 7,
            origin_fileName: "양산시정-페스티벌.jpg",
            upload_fileName: "151dff4a-8bdb-4db2-a3a4-abb4b45a21b5_양산시정-페스티벌.jpg",
            reg_date: "2023-11-22 08:31:37"
        },
        {
            idx: 8,
            origin_fileName: "양산시청-디지털 인문학.jpg",
            upload_fileName: "b2aacbd3-78a4-44b7-bff9-f602ec2ca66b_양산시청-디지털 인문학.jpg",
            reg_date: "2023-11-22 08:31:43"
        },
        {
            idx: 9,
            origin_fileName: "양산시청-부정유통.jpg",
            upload_fileName: "a16c1d40-7a22-4dd1-98a0-5afd444ba886_양산시청-부정유통.jpg",
            reg_date: "2023-11-22 08:31:49"
        },
        {
            idx: 10,
            origin_fileName: "양산시청-적십자.jpg",
            upload_fileName: "3e68e69e-d66c-46d3-8b65-888db2a7ae26_양산시청-적십자.jpg",
            reg_date: "2023-11-22 08:31:53"
        },
        {
            idx: 11,
            origin_fileName: "양산시청-평생학습관.jpg",
            upload_fileName: "62924e11-ce3c-42b1-a4fc-ec75b0a0dee4_양산시청-평생학습관.jpg",
            reg_date: "2023-11-22 08:31:57"
        }
    ]

    ///////////

    //분류
    let ImgArr = [];
    let VdoArr = [];
    for(let  i = 0; i<arr.length; i++){
        if(arr[i].upload_fileName.includes('mp4')){
            VdoArr.push(arr[i]);
        }
        if(arr[i].upload_fileName.includes('png') ||arr[i].upload_fileName.includes('jpg')){
            ImgArr.push(arr[i])
        }
    }



    let [imgResult,setImgResult] = useState([]);
    let imgURLs = [];

    useEffect(() => {
        ImgLoad();
        VdoLoad();
    }, []);
    const ImgLoad = async () => {
        for(let i = 0; i<ImgArr.length; i++){
            await axios.get('/api/did/files',{
                params: {filename: ImgArr[i].upload_fileName},
                responseType: 'arraybuffer'
            }).then((res) => {
                if(res.status === 200){
                    const contentType = res.headers['content-type'];
                   if (contentType && (contentType.startsWith('image/png') || contentType.startsWith('image/jpeg'))) {
                        const imageBlob = new Blob([res.data], {type: contentType});
                        const imageURL = URL.createObjectURL(imageBlob);
                        imgURLs.push({
                            id: ImgArr[i].idx,
                            url: imageURL,
                            type: 'image'
                        });
                    }
                }
            }).catch((e) => {
                console.log(e);
            });
        }
        return setImgResult(imgURLs);
    }

    let [vdoResult,setVdoResult] = useState([]);
    let videoUrls = [];

    const VdoLoad = async () => {
        for(let i = 0; i<VdoArr.length; i++){
            await axios.get('/api/did/thumb',{
                params: {filename: VdoArr[i].upload_fileName},
                headers: {Authorization: 'Bearer ' + localStorage.getItem("login"),},
                responseType: 'arraybuffer'
            }).then((res) => {
                if(res.status === 200) {
                    const contentType = res.headers['content-type'];
                    if (contentType && (contentType.startsWith('image/png') || contentType.startsWith('image/jpeg'))) {
                        const imageBlob = new Blob([res.data], {type: contentType});
                        const imageURL = URL.createObjectURL(imageBlob);
                        videoUrls.push({
                            id: VdoArr[i].idx,
                            url: imageURL,
                            type: 'image'
                        });
                    }
                }
            }).catch((e) => {
                console.log(e);
            });
        }
        return setVdoResult(videoUrls);
    }

    let vdoEdit =[...vdoResult];
    let ImgEdit = [...imgResult];

    const VdoResult = vdoEdit.filter((item,id) => {
        return vdoEdit.findIndex((item1,id1) => {
            return item.id === item1.id
        })===id
    })

    const ImgResult = ImgEdit.filter((item,id) => {
        return ImgEdit.findIndex((item1,id1) => {
            return item.id === item1.id
        })===id
    })

    return (
        <div>
            <button onClick={()=>{
                ImgLoad();
            }}>onCLick</button>

                {
                    ImgResult.map((arr,inx) => (
                        <div>
                            <img src={arr.url} style={{width: '100px',height: "100px",marginLeft: "1vh",marginTop: "1vh"}}/>
                        </div>
                    ))
                }

            {
                VdoResult.map((arr,inx) => (
                    <div>
                        <img src={arr.url} style={{width: '100px',height: "100px",marginLeft: "1vh",marginTop: "1vh"}}/>
                    </div>
                ))
            }

        </div>
    )
}

export default Test;