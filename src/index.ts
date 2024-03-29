import { HttpRequest, HttpResponse, Kv, Router } from "@fermyon/spin-sdk";

const KV_STORE = "default";

const encoder = new TextEncoder();
const decoder = new TextDecoder();
const router = Router();

interface Result {
  post: string;
  likes: number;
}

function getKey(url: string): string {
  const tmp = url.replace(new RegExp(/\/api\//), "");
  // Replace all slashes with underscores because kv explorer doesn't play nice
  // with slashes
  const key = tmp.replace(new RegExp(/\//g), "_");
  return key;
}

// Return the count of likes for a post e.g. GET /api/your/post/url/goes/here
router.get("/api/*", async (req): Promise<HttpResponse> => {
  console.log(`GET ${req.url}`);

  // Prepare the KV store and the key we'll use
  let kv = Kv.open(KV_STORE);
  let key = getKey(req.url);

  // Get the number of likes for the post or if it doesn't exist default to 0
  let likes = 0;
  if (kv.exists(key)) {
    likes = Number(decoder.decode(kv.get(key)));
  }

  return {
    status: 200,
    body: encoder.encode(JSON.stringify({ post: key, likes } as Result)),
  };
});

// Increment the count of likes for a post e.g. POST /api/your/post/url/goes/here
router.post("/api/*", async (req): Promise<HttpResponse> => {
  console.log(`POST ${req.url}`);

  // Prepare the KV store and the key we'll use
  let kv = Kv.open(KV_STORE);
  let key = getKey(req.url);

  // Get the number of likes for the post or if it doesn't exist default to 0
  let likesBefore = 0;
  if (kv.exists(key)) {
    likesBefore = Number(decoder.decode(kv.get(key)));
  }

  // Increment the post's likes by 1
  let likesAfter = likesBefore + 1;
  kv.set(key, likesAfter.toString());

  return {
    status: 200,
    body: encoder.encode(
      JSON.stringify({ post: key, likes: likesAfter } as Result)
    ),
  };
});

router.all("*", async () => {
  return { status: 404 };
});

// Entrypoint to the Spin handler.
export async function handleRequest(
  request: HttpRequest
): Promise<HttpResponse> {
  return await router.handle(
    {
      method: request.method,
      url: request.uri,
    },
    { body: request.body }
  );
}
