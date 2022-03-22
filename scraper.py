from TikTokApi import TikTokApi
from collections import Counter
import datetime

def scrape(id):
    api = TikTokApi(custom_verify_fp="verify_f72cedcee003f30d59dcf422b12b9dcc")
    user = api.user(username=id)
    #for liked_video in user.liked(username='public_likes'):
    #    print(liked_video)
    userdata = user.as_dict
    hashtags = []
    selfHashtags = []
    liked_users = []
    recent_like = []
    liked_sounds = []
    # list of common hastags to filter out
    keywords = ["fyp", "foryou", "xyzbca", "viral", "pov", "greenscreen", "stitch", "trending", "duet" ]
    # data
    data = {}
    likeduserprofile = {}
    data['id'] = userdata["id"]
    data['username'] = userdata["nickname"]
    data['openFavorite'] = userdata['openFavorite']
    data['profilePicture'] = userdata['avatarLarger']
    liked_videos = list()
    liked_list = user.liked()

    # for video in user.videos(count = 100):
        # print(video.hashtags)
        ## for hashtag in video.hashtags:           
        # Exclude hashtags
            ## if not any([a in hashtag.name for a in keywords]):
               ## selfHashtags.append(hashtag.name)


    for video in user.liked(username = 'public_likes', count = 1000):
        parameters = {'hashtags' : []}
        parameters['video_id'] = video.id
        parameters['video_sound'] = video.sound.title
        #print(video.author)
        parameters['video_author'] = video.author.username
        parameters['liked_profile_picture'] = video.author.as_dict['avatarLarger']
        likeduserprofile[video.author.username] = video.author.as_dict['avatarLarger']
        liked_users.append(video.author.username)
        if video.sound.title != "original sound":
            liked_sounds.append(video.sound.title)

        for hashtag in video.hashtags:
            parameters['hashtags'].append(hashtag.name)
            
            # Exclude hashtags
            if not any([a in hashtag.name for a in keywords]):
                hashtags.append(hashtag.name)


            #
        liked_videos.append(parameters)
    data['likedVideos'] = liked_videos

    c = Counter(hashtags)
    c_user = Counter(liked_users)
    c_sound = Counter(liked_sounds)
    c_self = Counter(selfHashtags)
    print ('most common', c.most_common(10))
    data['self_hashtags'] = c_self.most_common(10)
    data['most_liked_users'] = list(map(lambda x : list(x) + [likeduserprofile[x[0]]], c_user.most_common(5)))
    print(data['most_liked_users'])
    data['most_common_hashtags'] = c.most_common(10)
    data['most_liked_sounds'] = c_sound.most_common(10)
    # print('hashtags', hashtags)
    return data

# DATA SENDING TO FRONTEND

'''
{
    "id" : "",
    "username" : "",
    "picture" : "",
    "likeVideos" : [{
        "videoId" : "",
        "creatorId" : "",
        "hashtags" : [],
        "comments" : [{
            "comment" : ""
        }]
    }],
    
}
'''