const { exec } = require("child_process");
const ffmpegPath = require("ffmpeg-static");
const path=require("path");
const videoUrl = path.resolve(__dirname, "short.mp4")
const youtubeStreamUrl =
    "rtmp://a.rtmp.youtube.com/live2/6m24-pfdk-jhwq-1krb-3ufz"; // Replace with your actual stream key

const command = `${ffmpegPath} -stream_loop -1 -re -i "${videoUrl}" \
-c:v libx264 -b:v 3000k -preset veryfast -tune zerolatency -g 60 -r 30 -s 1080x1920 \
-c:a aac -b:a 192k -ar 48000 -f flv "${youtubeStreamUrl}"`;

exec(command, (error, stdout, stderr) => {
    if (error) {
        console.error(`Error: ${error.message}`);
        return;
    }
    if (stderr) {
        console.error(`stderr: ${stderr}`);
        return;
    }
    console.log(`stdout: ${stdout}`);
});
