from flask import request, jsonify, make_response, send_file, send_from_directory
from app.extensions import db
from sqlalchemy.sql import desc
from app.tweet import tweetBp
from app.models.tweet import Tweets
from app.models.user import Users

import datetime, os

from datetime import timedelta

from werkzeug.utils import secure_filename
from flask_jwt_extended import jwt_required, get_jwt_identity

# Minio 1 - Import minio
from minio import Minio

UPLOAD_FILE_LOCATION = './static/uploaded/'
ALLOWED_EXTENSIONS = {'jpg','jpeg','png'}

# Minio 2 - Membuat Bucket
BUCKET_NAME = 'imagebucketjump'

# Minio 3 - Membuat Client 
client = Minio(
    "play.min.io",
    access_key="Q3AM3UQ867SPQQA43P2F",
    secret_key="zuf+tfteSlswRu7BJ86wekitnifILbZam1KYY3TG"
    
)

def allowed_file(filename):
    """
    Cek apakah format file yang diupload benar
    """
    
    filename = filename.lower()
    extension = filename.split('.')[-1]
    
    return extension in ALLOWED_EXTENSIONS

@tweetBp.route("", methods=['GET'], strict_slashes = False)
@jwt_required(locations=["headers"],optional=True)
def get_tweet():
    page = request.args.get('page',1, type=int)
    per_page = request.args.get('per_page', 2, type=int)
    # if type(limit) is not int:
    #     return jsonify({'message': 'invalid parameter'}), 400
    
    user_id = get_jwt_identity()

    if not user_id:
        user_id = "None"
    else:
        user_id = user_id

    # get tweets by id
    tweets = Tweets.query.order_by(desc(Tweets.id)).paginate(page=page, per_page=per_page)
    
    # tweets = db.session.execute(
    #     db.select(Tweets).limit(limit)
    # ).scalars()

    results = []
    for tweet in tweets:
        results.append(tweet.serialize())

    response = make_response(jsonify(
        user_id = user_id,
        data=results,
        page = tweets.page,
        total_page = tweets.pages,
        total_item = tweets.total
        
    ), 200)
    # response.headers['Access-Control-Allow-Origin'] = '*'
    return response


@tweetBp.route("", methods=['POST'], strict_slashes = False)
@jwt_required(locations=["headers"])
def post_tweet():
    
    # Minio 4 - Checking keberadaan bucket
    # Make 'BUCKET_NAME' bucket if not exist.
    found = client.bucket_exists(BUCKET_NAME)
    if not found:
        client.make_bucket(BUCKET_NAME)
    # else:
    #     print("Bucket '{BUCKET_NAME}' already exists")
    
    # cek apakah terdapat file didalam post
    if 'file' in request.files:
        # program akan berjalan disini ketika ada upload file
        file = request.files['file']
        if file.filename == '':
            return jsonify('error','No file selected')

        if file and allowed_file(file.filename):
            content = request.form.get('content')
            user_id = get_jwt_identity()
            image_name = secure_filename(file.filename)
            
            # Minio 5 - Membuat variabel image size sebagai prasyarat dari penggunaan put_object
            image_size = os.fstat(file.fileno()).st_size
            # Minio 6 - Membuat request json dari client
            client.put_object(
                BUCKET_NAME, 
                image_name, 
                file, 
                image_size)
            # created_at = datetime.now()
            """
            Minio 7 - ubah image file ke link file yang sudah di upload ke minio
            image_path = os.path.join(os.getcwd()+'/app/static/uploaded', image_name)
            """
            image_path =  client.presigned_get_object(
                BUCKET_NAME, 
                image_name,
                expires=timedelta(days=7))
            
            # Minio 8 - Karena file upload sudah tidak disimpan di dalam folder server, sudah tidak perlu file.save lagi
            # file.save(image_path)
            
            new_content = Tweets(content = content, 
                                user_id = user_id, 
                                image_name = image_name,
                                image_path = image_path)
            
            db.session.add(new_content)
            db.session.commit()
            response = make_response(jsonify(data=new_content.serialize()), 200)
            return response
    
    # jika tidak ada upload file, program akan berjalan disini
    data = request.get_json()
    content = data.get('content', None)

    if not content:
        return jsonify({'error': 'Invalid data'}), 422
    
    user_id = get_jwt_identity()

    tweet = Tweets(
        user_id = user_id,
        content=content
    )
    db.session.add(tweet)
    db.session.commit()

    # make response
    response = make_response(jsonify(data=tweet.serialize()), 200)
    # konfigurasi CORS dari respponse
    # response.headers['Access-Control-Allow-Origin'] = '*'
    # response.headers['Content_Type'] = 'application/json'
    return response


# function untuk menampilkan image di halaman web
def serve_image(filename):
    """
    Serve uploaded image
    """
    
    img_dir = './static/uploaded/'
    image_path = os.path.join(img_dir, filename)
    return image_path


# API untuk menampilkan image
@tweetBp.route("/image/<string:name>", strict_slashes = False)
@jwt_required(locations=["headers"], optional=True)
def get_image(name):
    image_name = name
    img = serve_image(image_name)
    return send_file(img)
    

# API untuk download image
@tweetBp.route("/downloads/<string:name>", strict_slashes = False)
@jwt_required(locations=["headers"], optional=True)
def download_img(name):
    
    return send_from_directory(UPLOAD_FILE_LOCATION, name) 