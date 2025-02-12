from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from ..Models import Tweet, Follow
from ..serializers import TweetSerializer


class FeedViewSet(ViewSet):
    def list(self, request):
        user = request.user
        following_users = Follow.objects.filter(follower=user).values_list(
            "following", flat=True
        )

        followed_tweets = Tweet.objects.filter(user__id__in=following_users).order_by(
            "-created_at"
        )

        other_tweets = Tweet.objects.exclude(user__id__in=following_users).order_by(
            "-created_at"
        )

        tweets = list(followed_tweets) + list(other_tweets)

        serializer = TweetSerializer(tweets, many=True)
        return Response(serializer.data)
