import cohere
from cohere.classify import Example


def classify_hashtag(hashtags, category1, category2, example1, example2, amount=20):
    co = cohere.Client('tROv76zKglQGIbzsywOJ4b21v6UogXMwcl7qfSrU')

    all_examples = [Example(e, category1) for e in example1] + \
        [Example(e, category2) for e in example2]

    classifications = co.classify(
        model='medium-20220217',
        taskDescription='Identify Users Hashtags as part of straight or alt tiktok',
        outputIndicator='Classify these hashtags',
        inputs=hashtags[:amount],
        examples=all_examples)

    straightScore = 0
    # Following code gives percentage weight for straightness!!!!!!!
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
        tiktokScore = category2
    else:
        tiktokScore = category1

    return [straightScore, tiktokScore]
