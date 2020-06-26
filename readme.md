
<h3>Spotify x Angular</h3>

What do you need?
<ul>
    <li>Angular</li>
    <li>A Spotify Account</li>
</ul>

How to install?
<ul>
    <li>Pull the repository</li>
    <li>Open your command line in the folder where you pulled the repo to</li>
    <li>run : <code>npm install</code></li>
    <li>Once all the dependencies are installed create a project within the Spotify Developer enviroment to get your client ID and client Secret</li>
    <li>Use http://localhost:4200 as website url and callback url</li>
    <li>Place your client Id and secret in spotify.service.ts</li>
<li>run: <code>ng serve --open</code></li>
<li>Your project will open on localhost:4200. If Angular gives an error Cannot get / please edit a .ts file, just remove or add an empty line and rerun the before mentioned command</li>
</ul>

How to use?
<ul>
    <li>when the app is up and running you will be shown a simple login screen. If you click on login you will be shown a spotify login window. It will ask you for permission to access some information about your spotify account or make changes on your account. This is needed so you can create a playlist through the website or get all your playlists so they can be compared to others.</li>
	<li>When you are logged in you will be redicted to a screen with 2 cards where you can select what your next action will be:</li>
	<ul>
	<li>Create a new playlist</li>
	<ul>
		<li>When you choose this option you will be able to search for tracks by their name.</li>
		<li>By searching for a track a list will be shown with 20 items.</li>
		<li>By clicking the list item it will open a player to the bottom right of the screen. This allows you to listen to a track before you decide to add it.</li>
		<li>To add a track simply click on the plus icon and it will be added to the righ, this indicates that the track will be added to your playlist once you are done.</li>
		<li>After you've selected your desired tracks you can choose a name and a description (optional). </li>
		<li>Press Save Playlist to add the playlist to your account.</li>
</ul>
<li>Compare your playlists to other users playlist (this will show you how much of your playlist compares to others). You need to use the username before you can select a playlist you want to compare to.</li>
<ul>
	<li>Once on this screen you will see all of your playlists (If they are public)</li>
	<li>By clicking on one of your playlists it will be added to the middle of the screen to indicate that you want to compare this playlist to another one</li>
	<li>By filling in a username you will see this users paylists which are public</li>
	<li>Click on one of the items and it will also appear in the middle of the screen.</li>
	<li>Once you click on compare you will see the percentage of which your playlist compares to the other playlist.</li>
</ul>
</ul>

</ul>
