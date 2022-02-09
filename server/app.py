import base64
import json
import instaloader
import requests
import youtube_dl
from flask import Flask, request, Response
from flask_cors import cross_origin
from instaloader import Post
from flask_cors import CORS

app = Flask(__name__)
app.config['SECRET_KEY'] = "DianaWhore99"
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


@app.route('/download_instagram', methods=['GET', 'POST'])
@cross_origin()
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
            if i.is_video:
                videos.append(i.video_url)
            else:
                pics.append(i.display_url)
        if videos:
            for c in videos:
                r = requests.get(c)
                base64_data = base64.b64encode(r.content)
                base64_data_string = base64_data.decode("utf-8")
                data.append({'bytes': base64_data_string, 'title': "video.mp4", 'type': "video/mp4"})
        if pics:
            for f in pics:
                r = requests.get(f)
                base64_data = base64.b64encode(r.content)
                base64_data_string = base64_data.decode("utf-8")
                data.append(
                    {'bytes': base64_data_string, 'title': "image.jpg", 'type': "image/jpeg"})
    return json.dumps(data)


@app.route('/download_twitter', methods=['GET', 'POST'])
def download_twitter():
    if request.method == 'POST':
        original_url = request.get_json()
        url = original_url['url']
        with youtube_dl.YoutubeDL() as ydl:
            info_media = ydl.extract_info(url, download=False)
            data = {'url': info_media['url'], 'title': info_media['title'] + '.mp4'}
    return Response(json.dumps(data), status=200, mimetype='video/mp4')


@app.route('/download_any_page', methods=['GET', 'POST'])
def download_any_page():
    if request.method == 'POST':
        original_url = request.get_json()
        url_to_request = original_url['url']
        with youtube_dl.YoutubeDL() as ydl:
            info_url = ydl.extract_info(url_to_request, download=False)
            url = info_url["url"]
            print(info_url)
            info_media = requests.get(url)
            video_base64 = base64.b64encode(info_media.content)
            base64_data_string = video_base64.decode("utf-8")
            data = {'bytes': base64_data_string, 'title': info_url['title'] + '.mp4', 'type': "video/mp4"}
    return json.dumps(data)


if __name__ == '__main__':
    app.run(debug=True)
