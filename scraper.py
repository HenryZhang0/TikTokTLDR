from TikTokApi import TikTokApi
from collections import Counter

def scrape(id):
    api = TikTokApi(custom_verify_fp="verify_kur2tu8a_7SYVDTY2_3aWr_4LrQ_9vZb_ccDNB60S5qVC")
    user = api.user(username=id)
    #for liked_video in user.liked(username='public_likes'):
    #    print(liked_video)
    userdata = user.as_dict
    hashtags = []
    # data
    data = {}
    data['id'] = userdata["id"]
    data['username'] = userdata["nickname"]
    data['openFavorite'] = userdata['openFavorite']
    data['profilePicture'] = userdata['avatarLarger']
    liked_videos = list()
    for video in user.liked(username = 'public_likes', count = 1000):
        parameters = {'hashtags' : []}
        parameters['video_id'] = video.id
        #print(video.author)
        parameters['video_author'] = video.author.username
        for hashtag in video.hashtags:
            parameters['hashtags'].append(hashtag.name)
            if (not ("fyp" in hashtag.name or "foryou" in hashtag.name)):
                hashtags.append(hashtag.name)
        liked_videos.append(parameters)
    data['likedVideos'] = liked_videos

    c = Counter(hashtags)
    print ('most common', c.most_common(20))
    data['most_common_hashtags'] = c.most_common(20);
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