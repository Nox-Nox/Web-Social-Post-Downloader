import json
from flask_cors import CORS, cross_origin
from flask import Flask, render_template, request, session, redirect, send_file, url_for, jsonify, Response
import youtube_dl
import instaloader
import requests
import base64
from instaloader import Post

app = Flask(__name__)
CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['SECRET_KEY'] = "DianaWhore99"


@app.route('/')
def home():
    return render_template('home.html')


@app.route('/download_instagram', methods=['GET', 'POST'])
@cross_origin()
def download_instagram():
    if request.method == 'POST':
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
                q = requests.get(c)
                base64_data = base64.b64encode(q.content)
                base64_data_string = base64_data.decode("utf-8")
                data.append({'bytes': base64_data_string, 'title': "video.mp4", 'type': "video/mp4"})
                # data.append({'url': c, 'title': "video.mp4"})
        if pics:
            for f in pics:
                r = requests.get(f)
                base64_data = base64.b64encode(r.content)
                base64_data_string = base64_data.decode("utf-8")
                data.append({'bytes': base64_data_string, 'title': "image.jpg", 'type': "image/jpeg", 'type': "image/jpeg"})

            # for t in data:
            #     print(t)
            # data.append({'url': f, 'title': "pic.jpg"})
    # return jsonify(data)
    print(data)
    return json.dumps(data)


# return Response(json.dumps(data), status=200, mimetype='application/json')
# return Response(response = r.reason, status=r.status_code, headers=dict(r.headers))
# return jsonify(data, 200)


@app.route('/download_twitter', methods=['GET', 'POST'])
def download_twitter():
    if request.method == 'POST':
        urlj = request.get_json()
        print(urlj)
        url = urlj['url']
        with youtube_dl.YoutubeDL() as ydl:
            info_url = ydl.extract_info(url, download=False)
            print(info_url['url'])
            print(info_url['title'])
            data = {'url': info_url['url'], 'title': info_url['title'] + '.mp4'}

    return Response(json.dumps(data), status=200, mimetype='video/mp4')
    # return send_file(buffer, download_name=info_url['title'] + '.mp4')


if __name__ == '__main__':
    app.run(debug=True)
