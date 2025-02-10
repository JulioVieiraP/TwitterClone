from django.db import models

from twitterClone.Models import Usuario


class Tweet(models.Model):
    user = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name="tweets")
    content = models.TextField()
    imagem = models.ImageField(upload_to="tweets/", blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    answer_of = models.ForeignKey(
        "self", on_delete=models.CASCADE, blank=True, null=True, related_name="replies"
    )

    def __str__(self):
        reply_info = f" (Reply to {self.answer_of.id})" if self.answer_of else ""
        image_info = f" | Image: {self.imagem.name}" if self.imagem else ""
        return f"Tweet ID: {self.id} | User: {self.user.username} | Content: {self.content[:30]}{'...' if len(self.content) > 30 else ''}{image_info}{reply_info}"
