<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title>Frontend</title>
        <?php
            $manifestPath = base_path("manifest.json");
            $manifest = JSON_decode(file_get_contents($manifestPath), true);
            
            $js = isset($manifest['main']['js']) ? $manifest['main']["js"] : [];
            $css = isset($manifest['main']['css']) ? $manifest['main']["css"] : [];
        ?>  
        @foreach ($css as $name => $path )
            <link rel="stylesheet" href="{{asset('assets' . $path)}}">
        @endforeach
    </head>
    <body>
        <div id="root"></div>

        @foreach ($js as $name => $path)
            <script src="{{asset('assets/' . $path)}}"></script>
        @endforeach
    </body>
</html>