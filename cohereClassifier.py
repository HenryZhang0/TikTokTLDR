import cohere
from cohere.classify import Example


def classify_straight(hashtags):
    co = cohere.Client('A1nCKRTxl0qZHGQK8YPKWuY5Ci6Fd1bNkk1ymeEW')



    classifications = co.classify(
            model='medium-20220217',
            taskDescription='Identify Users Hashtags as part of straight or alt tiktok',
            outputIndicator='Classify these hashtags',
            inputs=hashtags[:100],
            examples=[Example("Trees", "Alt"), Example("asmr", "Straight"), Example("diesel", "Alt"), Example("donuts", "Alt"), Example("watermelon", "Alt"), Example("fruit", "Alt"), Example("zoo", "Alt"), Example("swag", "Straight"), Example("techtok", "Alt"), Example("fitness", "Straight"), Example("prank", "Alt"), Example("whisper", "Alt"), Example("gay", "Straight"), Example("lgbt", "Straight"), Example("comedy", "Straight"),
            Example("money", "Alt"), Example("astrology", "Alt"), Example("family", "Alt"), Example("fashion", "Straight"), Example("funny", "Straight"),
            Example("news", "Alt"), Example("cute", "Straight"), Example("math", "Alt"), Example("politics", "Alt"), Example("woman", "Straight"),
            Example("school", "Alt")
            ])


    straightScore = 0
    #Following code gives percentage weight for straightness!!!!!!!
    '''
    for i in range(20):
        print(classifications.classifications[i].prediction)
        print(classifications.classifications[i].confidence.confidence)
        '''


    for i in classifications.classifications:
            straightScore += i.confidence.confidence

    straightScore /= 100    
    print(straightScore)
    if 0.57 >= straightScore:
        tiktokScore = "alt"
    else:
        tiktokScore = "straight"

    return [straightScore, tiktokScore]




