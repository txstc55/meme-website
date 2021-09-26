import pymongo
import os
import hashlib
import os


def get_file_list(folder_name):
    all_files = [os.path.join(dp, f) for dp, dn, filenames in os.walk(
        folder_name) for f in filenames if f.lower() != ".ds_store"]
    return all_files


def hash_path(path):
    return int(hashlib.sha1(path.encode("utf-8")).hexdigest(), 16) % (10 ** 8)


all_files = get_file_list(os.path.abspath("../meme"))


def insert_if_not_exist(item, collection):
    if (collection.count_documents({'_id': item["_id"]}, limit=1) > 0):
        pass
    else:
        collection.insert_one(item)


# connect to the database
myclient = pymongo.MongoClient("mongodb://localhost:27017/")
# create the database if not exist, otherwise use it
mydb = myclient["meme"]
# create the collection
image_collection = mydb["images"]
video_collection = mydb["videos"]
gif_collection = mydb["gifs"]


for item in all_files:
    hash_id = hash_path(item)
    file_type = item.split(".")[-1].lower()
    file_item = {"_id": hash_id, "path": item,
                 "request_explaination": False, "explaination": ""}
    if file_type == "mov":
        insert_if_not_exist(file_item, video_collection)
    elif file_type == "gif":
        insert_if_not_exist(file_item, gif_collection)
    elif file_type == "jpeg" or file_type == "jpg" or file_type == "png":
        insert_if_not_exist(file_item, image_collection)
    else:
        print(file_type)

    # if file_type == "mov":
