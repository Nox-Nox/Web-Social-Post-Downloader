import base64
import json
import instaloader
import requests
import youtube_dl
from flask import Flask, request, Response
from instaloader import Post
from flask_cors import CORS

app = Flask(__name__)
app.config['SECRET_KEY'] = "SecretKey37!"
CORS(app)


def login_to_instagram():
    instance = instaloader.Instaloader(download_geotags=False,
                                       download_videos=True,
                                       download_pictures=True,
                                       download_comments=False,
                                       download_video_thumbnails=False)
    instance.post_metadata_txt_pattern = ""
    instance.download_geotags = False
    instance.save_metadata = False
    instance.save_metadata_json = True
    instance.download_comments = False
    instance.load_session_from_file("nux7510")
    print("Logged in")
    return instance


def base64_encode_decode(content, data, type):
    base64_data = base64.b64encode(content)
    base64_data_string = base64_data.decode("utf-8")
    if type == "video/mp4":
        return data.append({'bytes': base64_data_string, 'title': "video.mp4", 'type': "video/mp4"})
    else:
        return data.append({'bytes': base64_data_string, 'title': "image.jpg", 'type': "image/jpeg"})


@app.route('/download_instagram', methods=['GET', 'POST'])
def download_instagram():
    if request.method == 'POST':
        instance = login_to_instagram()
        original_url = request.get_json()
        to_format_url = original_url['url']
        short_code = to_format_url.split('p/')[1].split('/')[0]
        post = Post.from_shortcode(instance.context, short_code)
        videos = []
        pics = []
        data = []

        for i in post.get_sidecar_nodes():
            print(i)
            if i.is_video:
                videos.append(i.video_url)
            else:
                pics.append(i.display_url)
        if videos or pics:
            if videos:
                for c in videos:
                    r = requests.get(c)
                    base64_encode_decode(r.content, data, "video/mp4")
            if pics:
                for f in pics:
                    r = requests.get(f)
                    base64_encode_decode(r.content, data, "image/jpeg")
        else:
            if post.is_video:
                r = requests.get(post.video_url)
                base64_encode_decode(r.content, data, "video/mp4")
            else:
                r = requests.get(post.url)
                base64_encode_decode(r.content, data, "image/jpeg")

    return json.dumps(data)


@app.route('/download_twitter', methods=['GET', 'POST'])
def download_twitter():
    if request.method == 'POST':
        original_url = request.get_json()
        print(original_url)
        url = original_url['url']
        print(url)
        with youtube_dl.YoutubeDL() as ydl:
            info_media = ydl.extract_info(url, download=False)
            data = {'url': info_media['url'], 'title': info_media['title'] + '.mp4'}
    return Response(json.dumps(data), status=200, mimetype='video/mp4')


if __name__ == '__main__':
    app.run(debug=True)
