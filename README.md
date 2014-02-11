badge
=====

A javascript library for sniffing video URLs on the page it's loaded on

Adding it to your page:

    <head>
        <script type="text/javascript" src="http://badges.streamtest.com/scripts/streamtest.js">
        </script>
    </head>

You can pass an array of video URLs to test manually, first include the badge as above, then you can set your array like so:

    <script type="text/javascript">
        var StreamTestURLS = [
          'rtmp://example.com/application/stream'
        , 'rtmp://production.com/movies/mymovie.mp4'
        , 'rtmp://cdn.com/application/livestream'
        ]
    </script>

> Written by [willwh](https://github.com/willwh/).
