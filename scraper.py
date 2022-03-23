import json
from TikTokApi import TikTokApi
from collections import Counter
import cohere
from cohere.classify import Example
from cohereClassifier import classify_straight

def scrape(id):
    api = TikTokApi(custom_verify_fp="verify_f72cedcee003f30d59dcf422b12b9dcc")
    co = cohere.Client('A1nCKRTxl0qZHGQK8YPKWuY5Ci6Fd1bNkk1ymeEW')
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
    keywords = ["fyp", "foryou", "xyzbca", "viral", "pov", "greenscreen", "stitch", "trending", "duet", "1", "2", "3", "4", "5",
    "6", "fy", "iyk" ]
    classifyExamples = [Example("Trees", "Alt"), Example("asmr", "Straight"), Example("Diesel", "Alt"), Example("Donuts", "Alt"), Example("Watermelon", "Alt"), Example("Fruit", "Alt"), Example("Zoo", "Alt"), Example("swag", "Straight"), Example("techtok", "Alt"), Example("fitness", "Straight"), Example("prank", "Straight"), Example("whisper", "Straight"), Example("gay", "Straight"), Example("lgbt", "Straight"), Example("comedy", "Straight"),
Example("funny", "Straight"), Example("cemetery", "Alt"), Example("cute", "Straight"), Example("dance", "Straight"), Example("italian", "Alt"), Example("cars", "Alt"), Example("fun", "Straight"), Example("sealife", "Alt"), Example("doggo", "Alt"), Example("art", "Straight"), Example("painting", "Alt"), Example("love", "Straight"), Example("diy", "Alt"), Example("basketball", "Alt"), Example("backpack", "Alt"), Example("magic", "Alt"), Example("chef", "Alt"), Example("fashion", "Straight"), Example("swimming", "Alt"), Example("couple", "Straight"), Example("canada", "Straight"), Example("boys", "Straight"), Example("bts", "Straight"), Example("gaming", "Alt"), Example("valorant", "Alt"), Example("kpop", "Straight"), Example("toronto", "Straight"), Example("korean", "Straight"), Example("food", "Straight"), Example("mixed", "Straight"), Example("culture", "Straight"), Example("frat", "Straight")]
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
    hashtag_videos = {}
    user_liked_videos = user.liked(username = 'public_likes', count = 1000)
    for video in user_liked_videos:
        parameters = {'hashtags' : []}
        parameters['video_id'] = video.id
        parameters['video_sound'] = video.sound.title
        #print(video.info()["video"]["playAddr"])
        
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

            # video hashtag example
            if hashtag.name in hashtag_videos:
                hashtag_videos[hashtag.name].append(video)
            else:
                hashtag_videos[hashtag.name] = [video]
            #
        liked_videos.append(parameters)
    data['likedVideos'] = liked_videos

    c = Counter(hashtags)
    c_user = Counter(liked_users)
    c_sound = Counter(liked_sounds)
    c_self = Counter(selfHashtags)
    #print ('most common', c.most_common(10))
    data['self_hashtags'] = c_self.most_common(10)
    data['most_liked_users'] = list(map(lambda x : list(x) + [likeduserprofile[x[0]]], c_user.most_common(5)))
    #print(data['most_liked_users'])
    data['most_common_hashtags'] = c.most_common(10)

    print("the most common hashtag:", data['most_common_hashtags'][0][0])
    print("hashtag videos:", hashtag_videos)
    #if data['most_common_hashtags'][0][0] in list(map(lambda x: x.name, v.hashtags)):
    #        data['most_common_hashtags_video'] = v.info_full()
    data['most_common_hashtags_video'] = hashtag_videos[data['most_common_hashtags'][0][0]][0].info()["video"]["downloadAddr"]
    print("1111\n\n",data['most_common_hashtags_video'])
    
    data['most_liked_sounds'] = c_sound.most_common(10)
    # print('hashtags', hashtags)
    

    # caching test users
    #with open('taylor.json', 'w') as fp:
    #    json.dump(data, fp,  indent=4)
    
    #Classification Model
    classifications = co.classify(
        model='medium-20220217',
        taskDescription='Identify Users Hashtags as part of straight or alt tiktok',
        outputIndicator='Classify these hashtags',
        inputs=hashtags[:20],
        examples=[Example("Trees", "Alt"), Example("asmr", "Straight"), Example("Diesel", "Alt"), Example("Donuts", "Alt"), Example("Watermelon", "Alt"), Example("Fruit", "Alt"), Example("Zoo", "Alt"), Example("swag", "Straight"), Example("techtok", "Alt"), Example("fitness", "Straight"), Example("prank", "Straight"), Example("whisper", "Straight"), Example("gay", "Straight"), Example("lgbt", "Straight"), Example("comedy", "Straight"),
Example("funny", "Straight"), Example("cemetery", "Alt"), Example("cute", "Straight"), Example("dance", "Straight"), Example("italian", "Alt"), Example("cars", "Alt"), Example("fun", "Straight"), Example("sealife", "Alt"), Example("doggo", "Alt"), Example("art", "Straight"), Example("painting", "Alt"), Example("love", "Straight"), Example("diy", "Alt"), Example("basketball", "Alt"), Example("backpack", "Alt"), Example("magic", "Alt"), Example("chef", "Alt"), Example("fashion", "Straight"), Example("swimming", "Alt"), Example("couple", "Straight"), Example("canada", "Straight"), Example("boys", "Straight"), Example("bts", "Straight"), Example("gaming", "Alt"), Example("valorant", "Alt"), Example("kpop", "Straight"), Example("toronto", "Straight"), Example("korean", "Straight"), Example("food", "Straight"), Example("mixed", "Straight"), Example("culture", "Straight"), Example("frat", "Straight")])




    altScore = 0
    straightScore = 0

    #Following code gives percentage weight for straightness!!!!!!!

    for i in range(20):
        print(classifications.classifications[i].prediction)
        print(classifications.classifications[i].confidence.confidence)
    '''
    for i in classifications.classifications[0]["results"]:
            altScore += i.confidences[0].confidence
            straightScore += i.confidences[1].confidence
    '''

    if altScore > straightScore:
        tiktokScore = "alt"
    else:
        tiktokScore = "straight"

    data['tiktokScoreResult'] = tiktokScore
    # data['tiktokScoreResult'] = [tiktokScore, max(altScore, straightScore)/(altScore + straightScore)]
    
    
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