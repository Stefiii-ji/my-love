# For Stefiii 💜 — A Little Apology

A small, four-step apology page made with plain HTML, CSS, and JavaScript. It has no build step, backend, or required dependencies, so it works as a local file and can be hosted on GitHub Pages.

## Run it locally

1. Open the `stefiii-apology` folder in VS Code.
2. Install the **Live Preview** extension by Microsoft if it is not already installed.
3. Open `index.html`, then choose **Show Preview** from the editor context menu or the Command Palette.
4. You can also open `index.html` directly in a browser; all page assets use relative paths. Browser restrictions may prevent audio from playing from a `file://` URL, so use Live Preview to test music playback.

## Music

The current audio path is `assets/Kali Uchis - All I Can Say (Lyrics).mp3`, matching the file in this folder. Its URL-encoded `src` is already set in `index.html`. Keep this filename as-is, or if you replace/rename the track, update the `src` to the new relative path and URL-encode any spaces. The website currently uses the supplied `.webp` photos and this named MP3; it does not currently expect `photo*.jpg` or `music.mp3`.

Playback starts after Stefiii clicks **Open my little surprise**, then keeps playing and looping at a gentle volume while she moves through the screens. The header's **Music on/Music off** toggle can pause or resume it at any time. Browsers require a user interaction to allow playback. If the file is missing or the browser cannot play it, a brief status appears and the apology journey continues normally.

## Add your photos

The photos in this folder should use these exact filenames:

- `assets/photo1.webp`
- `assets/photo2.webp`
- `assets/photo3.webp`
- `assets/photo4.webp`

In VS Code, right-click `assets`, choose **Reveal in File Explorer**, and copy your four photos into that folder. Each matching photo card in **Our Little Memories 💜** loads its photo when tapped or activated from the keyboard. Tap it again to hide a loaded photo. If a file is missing, the scrapbook placeholder stays visible and explains which file to add.

To test locally, run the site with Live Preview. The journey is Welcome → A little reminder → My apology → The final note and memories. Activate each of the four memory cards on the final screen. Use **Back to the beginning** to return to the welcome screen. For GitHub Pages, upload all four photo files inside the `assets` folder as well as the website files.

The second photo (`assets/photo2.webp`) also appears on the **Before anything else...** screen.

## Publish with GitHub Pages

1. Sign in to GitHub and create a new **public** repository named `stefiii-apology`.
2. Upload `index.html`, `style.css`, `script.js`, and `README.md` from this folder to the repository's top level (the root). Upload the music file and all four photos from `assets` too, preserving their filenames and folder paths. Do not upload the parent workspace or unrelated folders.
3. In the repository, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the `main` branch and the `/ (root)` folder, then click **Save**.
6. Wait a minute or two. The Pages section will show the public address, usually `https://YOUR-USERNAME.github.io/stefiii-apology/`.
7. Open that address on your phone to test the published page. If it does not load right away, give the first deployment another minute and refresh.

The repository's visibility controls who can see its source files; a public Pages site is visible to anyone with its URL.
