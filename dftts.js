/***
 * TTS Code from Tel
 * FANCC
 */

// tts support main page
const ALLOW_TTS = true;
var tts = tts || {};
tts.init = () => {
    tts.audio = document.createElement("audio");
    tts.audio.controls = true;
    tts.networking = false;
    tts.cache = "";
    // document.getElementById("debug").appendChild(tts.audio);
    if (ALLOW_TTS){
        document.documentElement.style.setProperty('--d', 'block');
    }
};
tts.resetAndPlay = async function(text) {
    if (tts.networking || !ALLOW_TTS) return;
    if (tts.cache === text) {// use cache
        tts.resetTimePlay();
        return;
    }
    console.log('[info] tts');
    tts.stop();
    tts.networking = true;
    tts.iconState(this);
    let response = {};
    tts.cache = text;
    try {
        response = await fetch(`https://www.565455.xyz/api/tts?text=${tts.cache}&type=https`).then(r=>r.json());
        if (response.code) throw new Error("tts error");
    }
    catch (e) {
        alert("音频加载错误");
        console.error(e);
        tts.networking = false;
    }
    tts.audio.src = `https://www.565455.xyz/projects/voice/${response.data.filepath}`;
    try {
        await tts.resetTimePlay();
    }
    catch {}
    tts.networking = false;
    tts.iconState(this);
};
tts.resetTimePlay = async () => {
    const isPlaying = !tts.audio.paused && !tts.audio.ended && tts.audio.readyState > 2;
    if (isPlaying){
        console.log('[info] play state 1');
        tts.stop();
        return;
    }
    // console.log(tts.audio.paused);
    console.log('[info] play state 0');
    tts.audio.currentTime = 0;
    await tts.audio.play();
}
tts.stop = () => {
    tts.audio.pause();
}
tts.iconState = ele => {
    if (tts.networking){
        ele.innerHTML = "&#xe6b3;";
    }else{
        ele.innerHTML = "&#xe6b8;";
    }
}
tts.init();
