from django.db import models

from twitterClone.Models import Usuario


class Tweet(models.Model):
    user = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name="tweets")
    content = models.TextField()
    imagem = models.ImageField(upload_to="tweets/", blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    answer_of = models.ForeignKey(
        "self", on_delete=models.CASCADE, blank=True, null=True, related_name="comments"
    )

    retweet_of = models.ForeignKey(
        "self", on_delete=models.CASCADE, blank=True, null=True, related_name="retweets"
    )
