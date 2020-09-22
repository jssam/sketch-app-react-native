import api from "./api";

// export async function getsketch1(load, imageUrl, callback) {
//     load(true);

//     if (imageUrl == "") {
//         load(false);
//         alert("please add image");
//     }
//     else {

//         const jsondata = { "URL":  `${imageUrl}` }

//         console.log(7267);

//         try {
//             console.log(7738)
//             const response = await api.post('/img2sketch', jsondata);

//             const sketchurl = response.data;
//              console.log(sketchurl);
//             callback(sketchurl);
//             load(false);
//         } catch (err) {
//             load(false);
//             alert('no internet connection');
//         }
//     }
// };


export async function getsketch(load, imageUrl,url,sigm, callback,setselector,setsketch,setcartoon,setpainting) {
    load(true);
    if(url=="/close"){
        load(false);
        setpainting(true);
        setcartoon(true);
        setsketch(true);
        setselector(false);
        
    }
    else if (imageUrl == "") {
        load(false);
        alert("please add image");
    }
    else if(url=="/img2sketch"){
        const jsondata = { "URL": `${imageUrl}`,
        "Sigma":sigm }

        console.log(7267);

        try {
            console.log(url)
            const response = await api.post(url, jsondata);
            
            const sketchurl = response.data;
             console.log(sketchurl);
            callback(sketchurl);
            load(false);
        } catch (err) {
            load(false);
            alert('no internet connection');
        }
    }
    else {
        const jsondata = { "URL": `${imageUrl}` }

        console.log(7267);

        try {
            console.log(url)
            const response = await api.post(url, jsondata);
            
            const sketchurl = response.data;
             console.log(sketchurl);
            callback(sketchurl);
            load(false);
        } catch (err) {
            load(false);
            alert('no internet connection');
        }
    }
};

export  function getselector(name, setselector,setsketch,setcartoon,setpainting) {
    if (name == "Sketch"){
        setselector(true);
        setsketch(false);
        
    }
    else if (name == "Cartoon"){
        setselector(true);
        setcartoon(false);
    }
    if (name == "Paintings"){
        setselector(true);
        setpainting(false);
    }


};

// export async function getcartoon3(load, imageUrl, callback) {
//     load(true);

//     if (imageUrl == "") {
//         load(false);
//         alert("please add image");
//     }
//     else {
//         const jsondata = { "URL": `${imageUrl}` }

//         console.log(7267);

//         try {
//             console.log(7738)
//             const response = await api.post('/cartoon3', jsondata);

//             const sketchurl = response.data;
//              console.log(sketchurl);
//             callback(sketchurl);
//             load(false);
//         } catch (err) {
//             load(false);
//             alert('no internet connection');
//         }
//     }
// };




// export async function getcartoon4(load, imageUrl, callback) {
//     load(true);

//     if (imageUrl == "") {
//         load(false);
//         alert("please add image");
//     }
//     else {
//         const jsondata = { "URL": `${imageUrl}` }

//         console.log(7267);

//         try {
//             console.log(7738)
//             const response = await api.post('/cartoon4', jsondata);

//             const sketchurl = response.data;
//              console.log(sketchurl);
//             callback(sketchurl);
//             load(false);
//         } catch (err) {
//             load(false);
//             alert('no internet connection');
//         }
//     }
// };
