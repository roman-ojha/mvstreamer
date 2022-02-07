[<h1 style="font-size:60px; width:100%;">MVstreamer <img src="./appicon.png" style="width:60px;" alt="app Icon"/></h1>](./appicon.png)
## Streaming App Using:
1. ReactJs
2. NodeJs 
3. MongoDB (To store auth userDetail)
4. Firebase (To store images, files)
5. Flutter


## UI :
### Home Page :
[<img src="design/Home_Page.png" alt="webHome"></img>](design/Home_Page.png)
### Video Streamer Page :
[<img src="design/VideoPlayer.png" alt="webVplayer"></img>](design/VideoPlayer.png)
### Music Streamer Page:
[<img src="design/MusicPlayer_Page.png" alt="webMPlayer"></img>](design/MusicPlayer_Page.png)
### Local File Page:
[<img src="design/Local_Page.png" alt="webMPlayer"></img>](design/Local_Page.png)

### Flutter Application:

[<img src="design/mobile_home_page.jpg" style="width:20%;" alt="mobileHome"></img>](design/mobile_home_page.jpg)
[<img src="design/mobile_musicPlayer.jpg" style="width:20%;" alt="mobileMPlayer"></img>](design/mobile_musicPlayer.jpg)
[<img src="design/mobile_videoPlayer.jpg" style="width:20%;" alt="mobileVPlayer"></img>](design/mobile_videoPlayer.jpg)
[<img src="design/mobile_local_screen.jpg" style="width:20%;" alt="mobileVPlayer"></img>](design/mobile_local_screen.jpg)
[<img src="design/mobile_signIn_screen.jpg" style="width:20%;" alt="mobileVPlayer"></img>](design/mobile_signIn_screen.jpg)

<br/>

[<p style="font-size:50px;">Todo</p>](todo.md "Todo")

## How to run Locally:

### API:
1. `MVstreamer`
2. Create .env file in Root Directory
3. Get all the environment variables which are include in .env.example
4. Get Firebase SDK Service Account Key & Connect MongoDB
5. Run `npm start` to run the server

### React:
1. `Mvstreamer/client/web`
2. create '.env' file and add variable value included in '.env.example'
3. Run `npm install` to install all packages
4. Run `npm start` to run the server

### Flutter:
1. `MVstreamer/client/mobile`
2. Create .env file in Root Directory
3. Get all the environment variables which are include in .env.example
4. create Firebase app for android and ios google auth and download `google-services.json` & `GoogleServices-info.plist` and copy inside `android/app` & `./ios`
5. inside `ios/Runner/info.plist` change this line of code:
6. ```xml
   <array>
			<!-- Copied from GoogleService-Info.plist key REVERSED_CLIENT_ID -->
			<string>com.googleusercontent.apps.</string>
		</array>
    ```
7. create developer Facebook application and create `strings.xml` file inside `android/app/src/main/res/values` and copy this peace of code inside `strings.xml` and copy all the required value from developer facebook
8. ```xml
	<?xml version="1.0" encoding="utf-8"?>
	<resources>	
	<string name="facebook_app_id">1234</string>
	<string name="fb_login_protocol_scheme">fb1234</string>
	<string name="facebook_client_token">56789</string>
	<string name="app_name">app_name</string>
	</resources>
	```
9.  inside `ios/Runner/info.plist` change this like of code with your own value :
10. ```xml
	<key>CFBundleURLTypes</key>
	<array>
	<dict>
	<key>CFBundleURLSchemes</key>
	<array>
		<string>fbAPP-ID</string>
	</array>
	</dict>
	</array>
	<key>FacebookAppID</key>
	<string>APP-ID</string>
	<key>FacebookClientToken</key>
	<string>CLIENT-TOKEN</string>
	<key>FacebookDisplayName</key>
	<string>APP-NAME</string>
	```
10. Run `flutter run` 
