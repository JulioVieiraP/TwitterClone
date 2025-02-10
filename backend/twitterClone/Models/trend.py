from django.db import models


class Trend(models.Model):
    nome = models.CharField(max_length=100)
    counter = models.IntegerField(default=1)
    updated = models.DateTimeField(auto_now=True)

    def increment_counter(self):
        self.counter += 1
        self.save()
