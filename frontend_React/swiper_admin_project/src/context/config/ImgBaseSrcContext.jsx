import {createContext, useState} from "react";

export const ImgBaseSrcContext = createContext({});
export const ImgBaseSrcProvider = ({children}) => {
    const [imageSrc, setImageSrc] = useState('');

    const encodeFileToBase64 = (fileBlob) => {
        const reader = new FileReader();
        reader.readAsDataURL(fileBlob);
        return new Promise((resolve) => {
            reader.onload = () => {
                setImageSrc(reader.result);
                resolve();
            };
        });
    };

    const [imageSrc01, setImageSrc01] = useState('');

    const encodeFileToBase6401 = (fileBlob) => {
        const reader = new FileReader();
        reader.readAsDataURL(fileBlob);
        return new Promise((resolve) => {
            reader.onload = () => {
                setImageSrc01(reader.result);
                resolve();
            };
        });
    };

    const [imageSrc02, setImageSrc02] = useState('');

    const encodeFileToBase6402 = (fileBlob) => {
        const reader = new FileReader();
        reader.readAsDataURL(fileBlob);
        return new Promise((resolve) => {
            reader.onload = () => {
                setImageSrc02(reader.result);
                resolve();
            };
        });
    };

    return(
        <ImgBaseSrcContext.Provider value={{
            imageSrc, setImageSrc,
            encodeFileToBase64,
            imageSrc01, setImageSrc01,
            encodeFileToBase6401,
            imageSrc02, setImageSrc02,
            encodeFileToBase6402
        }}>
            {children}
        </ImgBaseSrcContext.Provider>
    )
}
