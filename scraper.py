from TikTokApi import TikTokApi


def scrape(id):
    api = TikTokApi(custom_verify_fp="verify_kur2tu8a_7SYVDTY2_3aWr_4LrQ_9vZb_ccDNB60S5qVC")
    user = api.user(username=id)
    for liked_video in user.liked(username='public_likes'):
        print(liked_video)
    return user.as_dict