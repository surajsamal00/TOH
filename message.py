import urllib.parse

msg = "Mu gote hidden one-time special easter egg vi rakhichi.. \nBas is page ko 3-4 baar reload krne ka bhai simple"
url = "/game/set_special/?message=" +  urllib.parse.quote_plus(msg)
print(url)
# /game/set_special/?message=%F0%9F%8E%89%20HAPPY%20BIRTHDAY%21%0A%20%20%20-GURUJI%20%F0%9F%8E%89
