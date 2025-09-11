import urllib.parse

msg = "🎉 HAPPY BIRTHDAY!!!🎉\nWith Best Regards,\n-Bakchod SURAJ"
url = "/game/set_special/?message=" + urllib.parse.quote(msg)
print(url)
# /game/set_special/?message=%F0%9F%8E%89%20HAPPY%20BIRTHDAY%21%0A%20%20%20-GURUJI%20%F0%9F%8E%89
