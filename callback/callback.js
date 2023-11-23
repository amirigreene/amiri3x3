const Params = new URLSearchParams(window.location.hash.slice(1));
const accessToken = Params.get('access_token');
console.log(accessToken)

imageStuff()

document.querySelectorAll('input').forEach((input)=>{
    input.addEventListener('input',imageStuff)
})

async function getTopCovers(term){
; // long_term & medium_term
    const limit = 50;
    const response = await fetch(`https://api.spotify.com/v1/me/top/tracks?time_range=${term}&limit=${limit}`,{
        headers: {
            Authorization: 'Bearer '+accessToken
        }
    });
    const topTracks = await response.json();
    const topCovers = topTracks.items.map((item)=>item.album.images[1].url);
    const uniquetopCovers = [... new Set(topCovers)].slice(0,9)
    return uniquetopCovers;
};
async function imageStuff(){
    const term = Array.from(document.getElementsByName('term')).find((input)=>input.checked).value
    const TOPCOVERS = await getTopCovers(term);
    const blank = document.querySelectorAll('img')
    TOPCOVERS.forEach((cover, index) => {
        blank[index].src = cover 
        console.log(cover, index)
    });
    const P = Array.from(document.querySelectorAll('img'))
                   .map((img)=> new Promise((resolve =>img.addEventListener('load',resolve))));
    await Promise.all(P)
        canvasPopulate();
}

function canvasPopulate(){
    
    const canvas = document.querySelector('canvas');
    const ctx = canvas.getContext("2d");

     //0,0 draws in corner
    canvas.toBlob(console.log)

    console.log(document.querySelector('img').width);
    singleImageWidth = document.querySelector('img').width;
    canvas.width = singleImageWidth * 3;
    canvas.height= singleImageWidth * 3;
    
    document.querySelectorAll('img').forEach((image,index)=>{
        ctx.drawImage(image,singleImageWidth*(index%3),singleImageWidth*(Math.floor(index/3)))
    })
}

