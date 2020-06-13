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
	<li>Compare your playlists to other users playlist (this will show you how much of your playlist compares to others)</li>
	</ul>

</ul>
