<div align="center">
  <h1>Like Button</h1>
  <img src="example.png" width="80"/>
  <p>This is a simple and persistent like button for your blog built with <a href="https://github.com/fermyon/spin">Spin</a>.</p>
</div>

## Using it on your blog

1. To start make sure you have Spin installed on your machine. Installation instructions can be found [here](https://developer.fermyon.com/spin/install).
2. Then clone this repository and build the Spin app.
   ```shell
   git clone git@github.com:calebschoepp/like-button.git
   cd like-button
   spin build
   ```
3. To locally test the like button we can run the Spin app on our machine by running `spin up`.
3. Next add the following HTML to your blog wherever you want the like button.

   ```html
    <iframe
    style="width: 72px; height: 40px; margin: 0; padding: 0; border: none"
    src="{BASE_URL}/static/likebutton.html?key={YOUR_KEY}"
    title="Like Button"
    ></iframe>
   ```

   You'll need to replace `{BASE_URL}` with `http://localhost:3000` if you're running your Spin app locally. If you've deployed your Spin app then you'll need to use the url provided by Fermyon Cloud.

   `{YOUR_KEY}` should be replaced with a unique key for that instance of the like button. For example if you place a like button on each of your blog posts then you could make the key the url of that blog post. This will make sure that each blog post has its own like count. Alternatively, you could use the same key for each like button on your blog and they would all be tracking the same count.
4.  When you've confirmed that the like button is working you can deploy the Spin app to the Fermyon cloud which will allow you to run the like button in production. You can deploy by running `spin deploy`. **NOTE: Fermyon Cloud does not yet support the KV database so until that support arrives you'll only be able to test the like button locally.**

## Security

Local storage is used to prevent users from easily liking a post more than once. However, note that there is nothing preventing a user from getting around this and liking a post as much as they want since the API is not authenticated.

## How is it built?

Coming soon!